# Deployment

The app is a standard Next.js 16 server application backed by PostgreSQL. Any host that runs `next start` on Node.js ≥ 20.9 works (Vercel, Render, Railway, Fly.io, a VPS with a reverse proxy). Use a managed PostgreSQL 15+ (Neon, Supabase, Render, RDS, Cloud SQL, Railway…).

> Nothing has been deployed by this project. The steps below are what remains to be done with your own accounts.

## Recommended free setup: Vercel + Neon

1. **Neon** → new project, region **Asia Pacific (Singapore)**. From *Connect*, copy the **pooled** string (host contains `-pooler`) and the **direct** string.
2. Put them in a local, git-ignored `.env.neon` (see `.env.example` for the format). `DATABASE_URL` = pooled + `&pgbouncer=true&connect_timeout=15`; `DIRECT_URL` = direct.
3. Apply migrations and sample content from your machine:
   ```bash
   set -a; . ./.env.neon; set +a          # PowerShell: Get-Content .env.neon | ? { $_ -match '^\w+=' } | % { $k,$v = $_ -split '=',2; Set-Item "env:$k" $v.Trim('"') }
   npx prisma migrate deploy
   npm run db:seed
   npm run admin:create -- --email you@example.org --name "Your Name"
   ```
4. **Vercel** → *Add New → Project* → import the GitHub repo. Framework: Next.js. **Build Command: `npm run vercel-build`** (runs `prisma migrate deploy` before `next build`, so later schema changes apply automatically). Add the variables from `.env.neon` under *Environment Variables* for **Production**. `vercel.json` pins functions to Singapore (`sin1`), next to the database.
5. After the first deploy, set `NEXTAUTH_URL` and `PUBLIC_BASE_URL` to the production address Vercel shows, redeploy, then set the same address in Admin → Settings → Public base URL.

Do not set `ADMIN_LOCAL_ONLY`, `APP_ENV`, `DEMO_ADMIN_PASSWORD` or `DISABLE_RATE_LIMIT` on Vercel.

## 1. Create the database

1. Create a PostgreSQL database in a region close to Sri Lanka (e.g. Mumbai / Singapore). UTF-8 encoding is required (default on managed providers).
2. Copy its connection string. Require TLS (`?sslmode=require`).
3. Serverless hosts: use the provider's **pooled** connection string for `DATABASE_URL` and add `&connection_limit=5` (Prisma). Run migrations with the **direct** (non-pooled) URL.
4. Turn on automated daily backups and point-in-time recovery if available.

## 2. Configure environment variables

Set these on the host (never commit them):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Managed PostgreSQL URL (TLS) |
| `NEXTAUTH_URL` | `https://your-domain` |
| `NEXTAUTH_SECRET` | 48+ random chars: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |
| `PARTICIPANT_TOKEN_SECRET` | A *different* 48+ char random value |
| `PUBLIC_BASE_URL` | `https://your-domain` (final production domain) |
| `TRUST_PROXY` | `true` on Vercel/Render/Fly/behind Nginx (they set `X-Forwarded-For`) |
| `NODE_ENV` | `production` (hosts usually set this) |

Do **not** set `APP_ENV=development`, `DEMO_ADMIN_PASSWORD`, `DISABLE_RATE_LIMIT` or `INSECURE_COOKIES` in production.

## 3. Build and migrate

```bash
npm ci
npx prisma migrate deploy      # applies prisma/migrations (non-destructive)
npm run build                  # prisma generate + next build
npm start                      # or the host's start command
```

- **Vercel**: Build command `npm run build`; add `npx prisma migrate deploy` as a release step (e.g. run it from CI with the direct DB URL before promoting, or prefix the build command: `prisma migrate deploy && npm run build`).
- **Render/Railway**: Build `npm ci && npm run build`; Pre-deploy `npx prisma migrate deploy`; Start `npm start`.
- **VPS**: run behind Nginx/Caddy with HTTPS (Let's Encrypt), `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`, and a process manager (systemd/pm2).

Multiple instances are safe: admission, answers, rate limits and live state all use the shared database, never process memory.

## 4. Seed content (optional)

```bash
npm run db:seed          # sample settings, 15 SAMPLE pioneers, 63 UNREVIEWED questions
```

The seed is idempotent and never creates administrators. **Never run `npm run db:demo` against production** (it refuses unless forced).

## 5. Provision the first administrator (securely)

Run once from a trusted machine with `DATABASE_URL` pointing at production (or as a one-off job on the host):

```bash
npm run admin:create -- --email organizer@example.org --name "Organizer Name"
# prompts twice for a password (hidden, min 12 chars); nothing is logged
```

Non-interactive (e.g. a one-off container job): set `ADMIN_PASSWORD` for that single command only, then remove it.

Other operations:

```bash
npm run admin:create -- --email organizer@example.org --reset       # new password, signs out all sessions
npm run admin:create -- --email organizer@example.org --deactivate  # disable account
```

Use a password manager; give each organizer their own account so the audit log identifies who did what.

## 6. Domain, HTTPS and QR codes

1. Attach the final domain and confirm HTTPS works.
2. Admin → Settings → set **Public base URL** to `https://your-domain`.
3. Admin → QR codes: the page must show **no warnings** before you download codes for printing.
4. Print one test poster, scan it with Android and iOS phones on the venue Wi-Fi and on mobile data.

## Local development without Docker

`npm run db:local` starts a real PostgreSQL 18 server from the `embedded-postgres` npm package (data in `.local-postgres/`, UTF-8). It is for development only.
