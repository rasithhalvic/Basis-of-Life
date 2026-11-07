# Basis of Life — Exhibition website

Bilingual (English / සිංහල) exhibition site for a public exhibition in Sri Lanka:

- **15 pioneer pages** with stable URLs for printed QR codes (`/pioneers/<slug>`).
- **One general knowledge quiz system** (not limited to medicine): sessions of at most 20 visitors, synchronized server-timed questions, per-session leaderboards and a grand leaderboard of top performers.
- **Admin dashboard**: settings, pioneers, question bank with review workflow, session control, disqualification, CSV exports, QR codes, audit log.

Stack: Next.js 16 (App Router, TypeScript, route handlers), Tailwind CSS 4, PostgreSQL + Prisma 6 (migrations), Zod, NextAuth (credentials) for admins, Vitest, Playwright.

> **Content status:** all pioneer records and questions shipped here are **SAMPLE** data for development. They are labelled as such on the site and must be replaced/reviewed by the organizers. No portraits or image credits are included.

## Documentation

| | |
| --- | --- |
| [docs/API.md](docs/API.md) · [docs/openapi.yaml](docs/openapi.yaml) | API reference / OpenAPI 3.1 spec |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Hosting, managed PostgreSQL, secure admin provisioning |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | Production launch checklist |
| [docs/ORGANIZER_GUIDE.md](docs/ORGANIZER_GUIDE.md) | Short guide for exhibition organizers |

## Local development

Requirements: Node.js ≥ 20.9 (tested on 24), npm, and PostgreSQL via **either** Docker **or** the bundled embedded server.

```bash
npm ci
cp .env.example .env            # then edit secrets (any long random strings locally)

# Database — pick one:
docker compose up -d db         # Docker (creates "exhibition" and "exhibition_test")
npm run db:local                # no Docker: real PostgreSQL via embedded-postgres (keep it running)

npx prisma migrate deploy       # apply migrations
npm run db:seed                 # sample settings, 15 SAMPLE pioneers, 63 UNREVIEWED questions

# Development-only demo fixture: REVIEWED demo questions + demo admin
DEMO_ADMIN_PASSWORD="choose-a-local-password" npm run db:demo     # PowerShell: $env:DEMO_ADMIN_PASSWORD="…"; npm run db:demo

npm run dev                     # http://localhost:3000
```

Admin login: <http://localhost:3000/admin/login> with `admin@demo.invalid` and the `DEMO_ADMIN_PASSWORD` you chose (or the generated one printed by `db:demo`). For a real admin use `npm run admin:create -- --email you@example.org` (see [DEPLOYMENT.md](docs/DEPLOYMENT.md#5-provision-the-first-administrator-securely)).

Remove the demo fixture with `npm run db:demo:remove`.

### Your first 20-person session

1. Admin → **Quiz sessions** → *Create and open registration* (defaults: 10 questions × 30 s).
2. On phones (or browser windows), open `/quiz`, pick a nickname, join the session (tap it or type the code).
3. Admin → open the session → **Start session**. Answer on the phones.
4. After the last question → **Finalize results** → see `/leaderboards/sessions/<id>` and `/leaderboards/grand`.

## Checks

```bash
npm run lint
npm run typecheck
npm test                        # Vitest against TEST_DATABASE_URL (tables are truncated; URL must contain "test")
npm run test:e2e                # Playwright; needs dev server data from db:seed + db:demo
                                # admin creds: E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD (default admin@demo.invalid / local-demo-password-123)
```

## Architecture notes

- `src/server/services/*` — domain logic (admission, scheduling, answers, rankings). Route handlers in `src/app/api/**` are thin: origin check → auth → Zod → service.
- **Admission** locks the visitor and session rows (`SELECT … FOR UPDATE`) inside a transaction; at most 20 admitted under any concurrency.
- **Timing**: starting a session snapshots reviewed questions and writes each question's `opensAt`/`closesAt` from the **database clock**. Clients only display; the server decides which question is open. `LIVE → COMPLETED` is applied lazily when the last window has closed — no background workers, no in-memory state.
- **Immutability**: DB triggers reject UPDATEs of session question snapshots and inserts after a session starts.
- **Scores** are never stored or accepted from clients; the `SessionParticipantScore` SQL view derives points and times; rankings use `RANK()`, so disqualification takes effect immediately.
- **Security**: httpOnly SameSite cookies (`__Host-`/`Secure` in production), HMAC-hashed visitor tokens and recovery codes, bcrypt admin passwords with lockout, origin checks on every mutation, DB-backed rate limits tuned for shared Wi-Fi, security headers, no secrets in client bundles.
- **i18n**: language is a cookie, so the same URL (and QR code) serves both languages. UI strings live in `src/i18n/messages.ts`.

## Assumptions

- The definitive list of 15 pioneers was not provided; 15 well-known pioneers are seeded as clearly labelled samples.
- Sinhala translations are drafts and need native-speaker review.
- Default quiz: 10 questions, 30 s each, 5 s break between questions, 10 s countdown. Questions are drawn at random from reviewed questions, spread across categories; options are shuffled once per session (everyone sees the same order).
- A visitor can hold a seat in only one open/live session at a time, and can leave before the session starts.
- Session leaderboards are visible as *unofficial* after the last question and become official on finalization.
- The grand leaderboard is *provisional* until all sessions are finalized/cancelled and an organizer declares it final.
