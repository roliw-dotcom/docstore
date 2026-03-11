# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js 16 with Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured. Validate changes by running `npm run build` and checking for TypeScript/lint errors.

## Architecture

**DocStore** (internal name: "bainder") is a document management SaaS. Users upload PDF/image/Office files; Claude AI extracts keywords, categories, summary, and follow-up action items from each document.

### Request flow
1. `src/proxy.ts` — combined i18n (next-intl) + Supabase auth middleware. Named export `proxy` (not `middleware`) because Next.js 16 renamed it.
2. All pages live under `src/app/[locale]/` — the `[locale]` segment is always `en` or `de`.
3. `src/app/[locale]/dashboard/layout.tsx` — server-side auth guard (double-checks after middleware).
4. Navigation helpers (`Link`, `useRouter`, `usePathname`) come from `src/navigation.ts` (next-intl wrappers), **not** from `next/navigation`. Exception: `redirect()` in Server Components uses `next/navigation` directly with an explicit locale prefix.

### Upload → processing pipeline
1. Client uploads file directly to Supabase Storage via signed URL.
2. Client POSTs to `/api/documents` to create the DB record (status: `pending`).
3. Client POSTs to `/api/documents/[id]/process` which:
   - Extracts text with `pdf-parse` (PDF), `mammoth` (DOCX), `xlsx` (spreadsheets), or direct text read.
   - Calls Claude Haiku (`claude-haiku-4-5-20251001`) to produce keywords, categories, summary, and follow_ups JSON.
   - Writes to `doc_metadata` and `follow_ups` tables; sets status to `ready` (or `error`).
4. Dashboard polls via `AutoRefresh` component (3 s interval) while any doc is `pending`/`processing`.

### Key constraints
- `pdf-parse` must stay on **v1.1.1** — v2 has a different export API.
- `pdf-parse`, `mammoth`, and `xlsx` are listed in `serverExternalPackages` in `next.config.ts` and must not be imported from client components.
- The pdf.js worker for react-pdf must use the **CDN URL** (`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`), not a local file — the local path fails under Turbopack.
- Storage bucket is named `documents` (private). Path pattern: `{user_id}/{doc_id}/{filename}`.
- File proxying: browser fetches files via `/api/documents/[id]/file` (server proxy) to avoid Supabase Storage CORS issues.

### Auth & tiers
- Supabase Auth handles sessions. Cookies are managed by `@supabase/ssr`.
- `src/lib/supabase/server.ts` — async server client (uses cookies). Use in Server Components and API routes.
- `src/lib/supabase/client.ts` — browser client for Client Components.
- `src/lib/get-user-tier.ts` — reads `profiles.tier` (`'free'|'pro'`). Free tier: 10-doc limit enforced in `POST /api/documents`.
- Stripe webhook (`/api/stripe/webhook`) updates `profiles.subscription_status` and `profiles.tier`.

### i18n
- Two locales: `en` (default), `de`. Config in `src/i18n/routing.ts`.
- All user-visible strings live in `messages/en.json` and `messages/de.json`.
- Server components: `getTranslations('namespace')` from `next-intl/server`.
- Client components: `useTranslations('namespace')` from `next-intl`.

### Rate limiting
- `src/lib/ratelimit.ts` wraps Upstash Redis with a **fail-open** policy (errors allow the request through).
- Three limiters: `processLimiter` (20/h LLM calls), `uploadLimiter` (30/h uploads), `accountLimiter` (5/h deletions).

### Cron jobs (vercel.json)
- `POST /api/cron/reminders` — daily 08:00 UTC, sends Resend emails for follow-ups due in 5 days (Pro users only). Protected by `Authorization: Bearer CRON_SECRET`.
- `POST /api/cron/inactivity` — weekly Monday 09:00 UTC, flags/deletes accounts inactive for 12 months.

### Supabase SQL files (run manually in SQL editor, not migrations)
- `supabase/schema.sql` — base tables (`documents`, `doc_metadata`)
- `supabase/follow-ups.sql` — `follow_ups` table + RLS
- `supabase/stripe.sql` — `profiles` table + auto-create trigger
- `supabase/storage-policies.sql` — storage RLS (includes DROP IF EXISTS guards)
- `supabase/migrations.sql` — unique constraint on `doc_metadata.doc_id`
- `supabase/free-tier-limit-trigger.sql` — Postgres trigger fixing free-tier race condition

### Design system
- Dark navy background `#0F2337`, accent orange `#F5A623`. No Tailwind dark-mode classes — inline styles are used for most colors.
- shadcn/ui components are in `src/components/ui/`. Add new ones with `npx shadcn add <component>`.
