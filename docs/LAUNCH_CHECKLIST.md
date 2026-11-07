# Production launch checklist

Tick every item before the public opening. Items marked ⚠ block launch.

## Infrastructure
- [ ] ⚠ Managed PostgreSQL created (UTF-8, TLS required, region near Sri Lanka).
- [ ] ⚠ `npx prisma migrate deploy` completed against production; `npx prisma migrate status` shows "up to date".
- [ ] ⚠ Automated daily backups enabled; retention ≥ 14 days; point-in-time recovery on if offered.
- [ ] ⚠ Restore tested once into a scratch database.
- [ ] ⚠ HTTPS works on the final domain; HTTP redirects to HTTPS.
- [ ] Host region/plan can handle the expected visitors (load test with 2–3 parallel sessions of 20 if possible).

## Environment variables
- [ ] ⚠ `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `PARTICIPANT_TOKEN_SECRET`, `PUBLIC_BASE_URL` set; secrets are long, random and different from development.
- [ ] ⚠ `NODE_ENV=production`; `APP_ENV`, `DEMO_ADMIN_PASSWORD`, `DISABLE_RATE_LIMIT`, `INSECURE_COOKIES` are **not** set.
- [ ] `TRUST_PROXY=true` only if the host/proxy sets `X-Forwarded-For`.
- [ ] No `.env` file committed to source control.

## Administrators
- [ ] ⚠ First administrator created with `npm run admin:create` (password ≥ 12 chars in a password manager).
- [ ] Each organizer has an individual account; no shared passwords.
- [ ] ⚠ No `@demo.invalid` accounts and no DEMO questions exist (Admin → Overview shows no demo warning; or run `npm run db:demo:remove` against a non-production copy first to see what it deletes).

## Content review
- [ ] ⚠ The 15 pioneer pages are the **approved** list; every SAMPLE record has been replaced or rewritten and verified by curators (Admin → Overview shows no "SAMPLE content" warning).
- [ ] ⚠ Exactly 15 pioneers are published.
- [ ] Portraits are licensed; attribution and licence fields are filled exactly as the licence requires; alt text describes each image.
- [ ] Sources listed for every pioneer and checked.
- [ ] ⚠ Sinhala texts (pages, UI strings in `src/i18n/messages.ts`, questions) reviewed by a native speaker.
- [ ] Exhibition name, introduction, dates (Asia/Colombo) and venue set in both languages.
- [ ] ⚠ Enough questions REVIEWED: at least `questionCount × planned sessions` if you want no repeats; each reviewed question checked for accuracy, single correct answer, and identical meaning in English and Sinhala.
- [ ] Nothing on the site implies institutional endorsement that has not been granted.

## Quiz rehearsal
- [ ] Run one full rehearsal session on the production site with staff phones on the venue Wi-Fi: register → join → start → answer → finish → finalize → leaderboards.
- [ ] Rehearsal session **cancelled** afterwards (cancelled sessions never count).
- [ ] Grand top-N setting confirmed (default 3).
- [ ] Large-screen display (`/leaderboards/grand/display`) tested on the exhibition screen (full-screen browser, sleep disabled).

## Public access
- [ ] Homepage, pioneer pages, quiz and leaderboards reachable without login on mobile data and venue Wi-Fi.
- [ ] `/admin` redirects to login; admin URLs are not printed anywhere public.
- [ ] Venue Wi-Fi does not block the domain; captive portal tested.

## Printed QR codes
- [ ] ⚠ Admin → Settings → Public base URL = final `https://` domain; Admin → QR codes shows **no warnings**.
- [ ] ⚠ Downloaded the combined ZIP *after* the base URL was final; `manifest.csv` checked against the poster list.
- [ ] ⚠ Each printed poster scanned with at least one Android and one iPhone; each opens the correct pioneer.
- [ ] QR printed at ≥ 3 cm with a quiet margin; not on glossy glare-prone areas.
- [ ] Slugs will not be changed after printing (if one must change, the old URL still redirects — re-test it).

## During the exhibition
- [ ] Someone monitors Admin → Sessions to start, finalize and (if needed) cancel sessions.
- [ ] Export finalized session CSVs and the grand CSV at the end of each day as an extra backup.
- [ ] When all sessions are finalized or cancelled, tick "Declare the grand leaderboard final" in Settings.
