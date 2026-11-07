# API reference

The machine-readable specification is [`openapi.yaml`](openapi.yaml) (OpenAPI 3.1, validated with Redocly).
This page summarises the same contract for humans.

## Conventions

| Topic | Rule |
| --- | --- |
| Format | JSON in and out. Errors are `{"error": {"code", "message", "details"?}}`. Unknown server errors return `500 INTERNAL_ERROR` without internals. |
| Visitor auth | httpOnly, `SameSite=Lax` cookie `visitor_session` (`__Host-visitor` + `Secure` in production), issued by registration or recovery. Random 256-bit token; only its HMAC is stored. |
| Admin auth | NextAuth credentials login at `/admin/login` (JWT cookie, 12 h). Every `/api/admin/*` handler re-loads the admin from the database (inactive accounts and bumped `tokenVersion` are rejected). Unauthenticated → `401 UNAUTHENTICATED`. |
| CSRF | POST/PUT/PATCH/DELETE require a same-origin `Origin` (or `Sec-Fetch-Site: same-origin`). Otherwise `403 ORIGIN_REJECTED`. |
| Validation | Zod schemas in [`src/lib/validation.ts`](../src/lib/validation.ts). Failures → `400 VALIDATION_FAILED` with `details.issues[] = {path, message}`. Bodies over 200 kB → `413`. |
| Rate limits | Shared, database-backed fixed windows (work across instances). Per-IP limits are generous because exhibition Wi-Fi puts many phones behind one IP; authenticated actions are limited per visitor. Exceeded → `429 RATE_LIMITED` with `Retry-After`. |
| Time | ISO-8601 UTC. Question windows use the **database clock**. UI shows Asia/Colombo. |
| Caching | All API responses send `Cache-Control: no-store`. |

Rate-limit policies (requests / window): registration 120 per IP and 1500 global per 10 min; recovery 30 per IP and 300 global per 10 min; join 30 per visitor per 5 min; answers 120 per visitor per min; state polling 240 per visitor per min; anonymous reads 3000 per IP per min; admin login 20 per IP and 10 per email per 15 min (plus a 15-minute lock after 5 wrong passwords).

## Public and visitor endpoints

| Method & path | Auth | Purpose |
| --- | --- | --- |
| `GET /api/pioneers?lang=en\|si` | none | Published pioneers |
| `GET /api/pioneers/{slug}` | none | One pioneer; old slugs → `308` + `Location` |
| `GET /api/sessions/open` | none | Sessions accepting participants (seats left) |
| `POST /api/participants` | none | Register nickname; sets cookie; returns recovery code once |
| `GET /api/participants/me` · `DELETE` | visitor | Current identity and active session · sign out |
| `POST /api/participants/recover` | none | New cookie from a recovery code |
| `POST /api/sessions/{code}/join` | visitor | Admission (max 20, row-locked transaction) |
| `POST /api/sessions/{id}/leave` | visitor | Give up a seat before start |
| `GET /api/sessions/{id}/state` | optional visitor | Live state for polling |
| `POST /api/sessions/{id}/answers` | visitor | Submit an answer |
| `GET /api/sessions/{id}/results` | visitor | Own breakdown after finish |
| `GET /api/sessions/{id}/leaderboard` | none | Session ranking |
| `GET /api/leaderboards/grand` | none | Grand ranking |
| `GET /api/leaderboards/sessions` | none | Finished sessions list |

> Next.js requires one name per dynamic segment, so the folder is `/api/sessions/[id]/join`; for this route the segment is the **6-character session code**.

### Register

```http
POST /api/participants
Content-Type: application/json

{"nickname": "Nimal", "consentToDisplayNickname": true, "locale": "si"}
```

`201 Created`, `Set-Cookie: visitor_session=…; HttpOnly; SameSite=Lax`

```json
{"participant": {"id": "cm3…", "nickname": "Nimal", "nicknameConsent": true}, "recoveryCode": "K7P2-QX9M-4HRT"}
```

Validation: nickname 2–24 chars after trimming/NFC normalisation; letters of any script (incl. Sinhala marks), digits, spaces, `. _ -`; must start with a letter or digit. No email, phone or real name is collected. If consent is `false`, public boards show "Anonymous participant".

### Join

```http
POST /api/sessions/K7P2QX/join
```

| Status | Code | Meaning |
| --- | --- | --- |
| 200 | — | `{"admitted": true, "sessionId": "…", "alreadyAdmitted": false}` (repeat calls are idempotent) |
| 401 | `UNAUTHENTICATED` | Register first |
| 404 | `NOT_FOUND` | Unknown code |
| 409 | `SESSION_FULL` | 20 already admitted. `details.alternatives` lists other open sessions with seats. No session is created automatically. |
| 409 | `SESSION_CLOSED` | Draft, started, finished or cancelled (late admission closed). `details.status`, `details.alternatives`. |
| 409 | `ALREADY_IN_ACTIVE_SESSION` | Visitor already holds a seat in another open/live session (`details.sessionId`, `details.code`). |

Concurrency: the transaction locks the visitor row, then the session row (`SELECT … FOR UPDATE`), counts admissions and inserts. A unique index on `(sessionId, participantId)` backs it up. Tested with 21 and 40 simultaneous joins → exactly 20 admitted.

### Live state

`GET /api/sessions/{id}/state` returns `serverNow`, `phase` (`waiting | countdown | question | break | finished | cancelled`), session counts (`admittedCount` of `capacity` 20), `me` (`admitted`, `disqualified`) and, while live, `live` with progress. Only an **admitted** visitor receives `live.question` — and only the question whose window contains the server time:

```json
{"id": "cm6…", "number": 3, "category": "HISTORY",
 "prompt": {"en": "In which year…", "si": "…"},
 "options": [{"id": "cm7…", "text": {"en": "1945", "si": "1945"}}, …],
 "opensAt": "2026-12-15T05:31:06.000Z", "closesAt": "2026-12-15T05:31:36.000Z",
 "myAnswer": null}
```

No correctness flags, no future questions. The client polls with backoff (≈3 s, faster near `closesAt`/`nextOpensAt`, exponential up to 30 s with jitter on errors, honouring `Retry-After`). Reloading the page re-reads this authoritative state, including `myAnswer`.

### Submit an answer

```http
POST /api/sessions/{id}/answers
{"sessionQuestionId": "cm6…", "optionId": "cm7…"}
```

| Status | Code | Meaning |
| --- | --- | --- |
| 201 | — | `{"status":"accepted","duplicate":false,"receivedAt":"…"}` — correctness is **not** revealed |
| 200 | — | Identical retry of an accepted answer (`duplicate: true`) — safe to retry on network errors |
| 403 | `NOT_A_MEMBER` / `DISQUALIFIED` | |
| 409 | `QUESTION_EXPIRED` | Server receipt time ≥ question `closesAt` |
| 409 | `QUESTION_NOT_OPEN` | Before `opensAt` |
| 409 | `ANSWER_ALREADY_SUBMITTED` | A different option was already accepted (`details.acceptedOptionId`); answers cannot be changed |
| 409 | `SESSION_NOT_LIVE` | Session not running |
| 422 | `INVALID_OPTION` | Option not part of this question |

Response time = database receipt time − question `opensAt`, clamped to the question length. Unanswered questions count as the full question time. The client never sends a score, rank or time.

### Results and leaderboards

- `GET /api/sessions/{id}/results` (visitor): `409 RESULTS_NOT_AVAILABLE` until the last question closes. Then: per-question options with `isCorrect`, your choice, points, response time, explanation, total, rank and `official` (true only when finalized).
- `GET /api/sessions/{id}/leaderboard`: `{official, session, entries[{rank, displayName, totalPoints, correctCount, questionCount, totalTimeMs, isMe}]}`. Available once COMPLETED (labelled unofficial) and official once FINALIZED. Disqualified visitors are excluded.
- `GET /api/leaderboards/grand`: `{provisional, qualifyTopN, finalizedSessions, pendingSessions, entries[{rank, displayName, sessionCode, sessionRank, totalPoints, totalTimeMs, isMe}]}`.

Ranking rules (all derived in SQL from stored answers via the `SessionParticipantScore` view):

1. 100 points per correct answer, 0 for wrong/unanswered.
2. Order by points descending, then total response time ascending.
3. Identical points **and** time share a rank (`RANK()`: 1, 1, 3).
4. Grand qualification: rank ≤ N (default 3, configurable) in each **finalized** session — everyone tied at the cutoff qualifies.
5. One grand entry per visitor: their single best qualifying result. Scores are never summed across sessions.
6. Cancelled sessions and disqualified results never count. The grand board is provisional while any session is pending or until an organizer declares it final.

## Admin endpoints

All require an admin session; all mutations are written to the audit log.

| Method & path | Purpose / notable errors |
| --- | --- |
| `GET /api/admin/me` | Current admin |
| `GET`/`PUT /api/admin/settings` | Exhibition text (en/si), dates, QR base URL, top-N, defaults, "declare final" (`409` if sessions pending) |
| `GET`/`POST /api/admin/pioneers` | List / create. `409 SLUG_TAKEN`, `409 PUBLISH_LIMIT` (max 15 published) |
| `GET`/`PUT`/`DELETE /api/admin/pioneers/{id}` | Slug change keeps a permanent redirect from the old slug; delete only when unpublished |
| `GET`/`POST /api/admin/questions` | Filters `category`, `reviewStatus`, `q`. New questions are `UNREVIEWED` |
| `GET`/`PUT`/`DELETE /api/admin/questions/{id}` | Edit resets to `UNREVIEWED`; session snapshots unaffected |
| `POST /api/admin/questions/{id}/review` | `{"reviewStatus": "REVIEWED"\|"REJECTED"\|"UNREVIEWED"}` |
| `GET`/`POST /api/admin/sessions` | Create (`questionCount`, `secondsPerQuestion`, `breakSeconds`, `countdownSeconds`, `categories`, `openImmediately`). Capacity always 20 (DB CHECK). |
| `GET`/`PATCH /api/admin/sessions/{id}` | Detail · edit settings (DRAFT/OPEN only, else `409 INVALID_TRANSITION`) |
| `POST /api/admin/sessions/{id}/open` | DRAFT → OPEN |
| `POST /api/admin/sessions/{id}/start` | OPEN → LIVE; `409 NOT_ENOUGH_QUESTIONS` if too few reviewed bilingual questions |
| `POST /api/admin/sessions/{id}/cancel` | `{"reason"}`; any non-final status → CANCELLED |
| `POST /api/admin/sessions/{id}/finalize` | COMPLETED → FINALIZED; `409` while still running |
| `POST`/`DELETE /api/admin/sessions/{id}/participants/{spId}/disqualify` | Disqualify `{"reason"}` / reinstate |
| `GET /api/admin/exports/sessions/{id}` | CSV (finalized only) |
| `GET /api/admin/exports/grand` | CSV |
| `GET /api/admin/qr` | Base URL, warnings, targets; `?slug=&format=svg\|png` downloads one code (`X-QR-Target` header) |
| `GET /api/admin/qr/all` | ZIP: `svg/`, `png/`, `manifest.csv`, `README.txt` |
| `GET /api/admin/audit?limit=` | Audit records |

Session lifecycle: `DRAFT → OPEN → LIVE → COMPLETED → FINALIZED`, with `CANCELLED` reachable from any non-final state. `LIVE → COMPLETED` happens automatically when the last question closes (applied lazily on the next read).
