# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`pnpm@10.7.0`, `legacy-peer-deps=true` in `.npmrc`).

```bash
pnpm install          # install deps (runs `prisma generate` via postinstall)
pnpm dev               # start dev server (Next.js + Turbopack)
pnpm build             # production build
pnpm start             # run the production build

pnpm lint              # next lint
pnpm lint:fix          # eslint --fix + prettier --write
pnpm lint:strict       # eslint --max-warnings=0 (used for CI-strictness checks)
pnpm format            # prettier --write .
pnpm format:check       # prettier -c -w .

pnpm prisma:generate    # regenerate the Prisma client after schema changes
pnpm prisma:push        # push schema.prisma to the DB without a migration (dev/prototyping)
pnpm migrate:dev        # create + apply a migration locally
pnpm migrate:deploy     # apply pending migrations (used in deploy)
pnpm db:studio          # open Prisma Studio
```

There is no test suite/runner configured in this repo (no `test` script, no `*.test.*`/`*.spec.*` files). Typecheck with `npx tsc --noEmit` since there's no dedicated script for it.

Husky + lint-staged run Prettier on staged files on commit (see `"lint-staged"` in `package.json`).

## Environment

Copy `.env.example` to `.env.local` (or `.env`) and fill in values. Key vars: Clerk auth keys, `DATABASE_URL`/`DIRECT_URL` (Supabase Postgres via Prisma), `RESEND_API_KEY`/`RESEND_FROM_EMAIL` (transactional email), `CLOUDWATCH_*`/`AWS_ARN` (Winston → CloudWatch logging), `NEXT_PUBLIC_POSTHOG_*` (analytics).

`DATABASE_URL` must point at Supabase's **transaction-mode pooler (port 6543)** with `?pgbouncer=true&connection_limit=1` — this app runs on serverless functions, so session-mode (port 5432) on the pooled URL exhausts connections. `DIRECT_URL` should stay on port 5432 (used only for migrations).

## Architecture

### Data layer: `db/lib` → `db/core` → actions/pages

Database access is split into two layers under `src/db/`:

- **`src/db/lib/`** — the Prisma layer. One subfolder per domain (`user`, `transaction`, `sagar-transaction`, `summary`), each exporting raw Prisma queries. `src/db/lib/prisma.ts` holds the single `PrismaClient` singleton (`globalThis` pattern to survive Next.js dev hot-reload) — never instantiate `PrismaClient` elsewhere. Everything is re-exported as `db` from `src/db/lib/index.ts`.
- **`src/db/core/`** — the business-logic layer, mirroring the same domain folders, re-exported as `core` from `src/db/core/index.ts`. Core functions call into `db.*` and add domain logic (e.g. `src/db/core/summary/index.ts` computes loan interest across transaction history rather than just querying it).

Server actions (`src/actions/*-action.ts`) call `core.*`, not `db.*` directly. Pages/layouts that need data outside an action typically go through `core` as well (e.g. `src/lib/get-authenticated-user.ts` → `core.user.getUserByClerkId`).

There are two distinct "transaction" domains — don't confuse them: `transaction` (loans/interest/monthly savings, tied to `User`) and `sagar-transaction` (a separate deposit/withdraw ledger, `SagarTransaction` model, no user relation).

### Server actions via `next-safe-action`

All mutations/queries invoked from client components go through `src/lib/safe-action.ts`, which defines three tiers:
- `actionClient` — no auth
- `authActionClient` — requires a logged-in Clerk user (`ctx.userId`)
- `authAdminClient` — requires `authActionClient` **and** `UserType.ADMIN` role (checked via `checkUserRole()` in `src/lib/authorization.ts`)

Actions live in `src/actions/*.ts`, each starting with `'use server'`, chaining `.schema(zodSchema).action(async ({ parsedInput, ctx }) => ...)`. Zod schemas live in `src/schema/*.schema.ts` and are re-exported from `src/schema/index.ts`. Return values are wrapped with `SuperJSON.stringify`/`parse` round-trips to preserve types like `Decimal`/`Date` across the server action boundary.

### Auth: Clerk + role-based access

- `src/middleware.ts` runs `clerkMiddleware` and calls `auth.protect()` only for `/dashboard(.*)` and `/auth/fallback(.*)` — it does not touch the DB.
- App-level role checks (`ADMIN` vs regular `UserType`) happen downstream, per-action via `authAdminClient`/`checkUserRole()`, not in middleware.
- `src/lib/get-authenticated-user.ts` maps a Clerk `userId` to the app's `User` row (by `clerkUserId`) and is wrapped in React's `cache()` so repeated lookups within one request (root layout, parallel route slots, `checkUserRole`) share a single DB round trip instead of re-querying.

### Routing: parallel routes on the dashboard overview

`src/app/dashboard/overview/` uses Next.js parallel routes (`@user_account_summary`, `@overall_transaction_summary` slots defined in `layout.tsx`) so the two summary panels stream/render independently rather than blocking each other.

### Feature-based organization

`src/features/<feature>/` holds feature-specific `components/`, with cross-cutting pieces in `src/components/` (`ui/` = shadcn primitives, `layout/` = header/sidebar/etc.), matching the pattern documented in `README.md`. Note the README's route-group example (`(auth)`/`(dashboard)`) is illustrative — actual routes live directly under `src/app/auth/` and `src/app/dashboard/`, no route groups.

### Prisma schema

`prisma/schema.prisma` defines `User`, `Transaction`, `SagarTransaction` models and `UserType`, `UserStatus`, `TransactionType`, `TransactionAction` enums. The `datasource` block uses `DATABASE_URL` (pooled, for queries) and `directUrl = DIRECT_URL` (unpooled, for migrations) — standard Prisma + Supabase dual-URL setup.

### Background jobs

`vercel.json` defines two Vercel Cron jobs hitting `src/app/api/cron/*`: `send-monthly-reminder` (interest reminder emails via Resend, rate-limited with a deliberate delay between sends) and `health` (DB health check, also used by `src/db/core/health-check`).
