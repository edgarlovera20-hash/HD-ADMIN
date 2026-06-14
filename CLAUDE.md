# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`HD-ADMIN` is the administration platform of the Heavenly Dreams (HD) ecosystem
(`admin.heavenlydreams.com.mx`): users, roles, permissions, finance records, audit, integrations,
and BI administration. Per `ecosystem-boundaries.v1.json` it must **not** own public marketing
pages, candidate evaluation, CRM conversations, or control-tower recommendations.

It is one of several sibling apps; the shared foundation lives in `HD-CORE`.

## Critical: sibling checkout requirement

Dependencies on the shared layer use relative paths, e.g.
`"@hd/core-rbac": "file:../HD-CORE/packages/rbac"`. **`HD-CORE` must be cloned as a sibling
directory** (`../HD-CORE`) or `npm install` fails. CI checks out `HD-CORE` alongside this repo (see
`.github/workflows/ci.yml`). Auth, RBAC, UI, types, and validation come from `@hd/core-*` — don't
reimplement them here.

> `README.md` lists an aspirational stack (Next.js/NestJS/Shadcn). The actual stack is React 18 +
> Vite 6 + Tailwind v4 (client) and Express + Prisma (server). Trust the code.

## Commands

```bash
npm install          # runs `prisma generate` via postinstall
npm run dev          # tsx server.ts — Express server (dev serves /api only; client runs via Vite)
npm run typecheck    # tsc --noEmit — the real quality gate (CI runs this as both lint and typecheck)
npm run lint         # alias for tsc --noEmit
npm run test         # placeholder (echo TODO)
npm run format       # prettier on src/** and server/**
npm run build        # build:client (vite build) + build:server (esbuild → dist/server.cjs)
npm start            # node dist/server.cjs  (production: serves built client + /api)
```

No test runner is wired up yet (`test` is a placeholder). `typecheck` is the gate that CI enforces.

## Architecture

**Single Express process, two modes** (`server.ts`):
- Mounts API routers under `/api/*` (auth, agent, health, users, audit, webhooks/n8n, events).
- In production (`NODE_ENV=production`) it also serves the Vite-built client from `dist/client` with
  an SPA fallback. In dev it only exposes the API; the React client is served by Vite separately.

**Server code** (`server/`):
- `routes/` — one router per resource, mounted in `server.ts`.
- `middleware/requireAuth.ts` — JWT Bearer auth (`JWT_SECRET`), attaches `req.user` (`sub`, `email`,
  `role`). `middleware/auditLog.ts` records sensitive actions.
- `agents/finance-agent.ts` — domain AI agent (see `docs/FINANCE_ADMIN_AGENT_POLICY.md`).
- `events/` — cross-platform event forwarding. Producers POST to subscriber ingest endpoints (e.g.
  `BRAIN_EVENTS_URL=.../api/events/ingest`) authenticated with `EVENT_BUS_SECRET`.
- `db.ts` — Prisma client.

**Client code** (`src/`): React + React Router (`App.tsx`, `pages/`, `components/`, `hooks/`,
`design-system/`). Entry `main.tsx`.

**Data** (`prisma/schema.prisma`): PostgreSQL. Core models include `User` (with `UserRole` enum:
admin/manager/operator/viewer) and `AuditLog`. After editing the schema, run `npx prisma generate`
(and a migration as appropriate).

## RBAC

Authorization uses `@hd/core-rbac`'s `hasPermission(userPermissions, required)`, which supports
wildcard grants like `admin.*` or `users.*` matching `users.create`. Permission strings are defined
centrally in HD-CORE — add new permissions there, not locally.

## Config & docs

Copy `.env.example` to `.env`. Key vars: `DATABASE_URL`, `JWT_SECRET`, `EVENT_BUS_SECRET`,
`BRAIN_EVENTS_URL`, `N8N_WEBHOOK_*`. Deeper design docs live in `docs/` (`ARCHITECTURE.md`,
`API_CONTRACT.md`, `EVENTS.md`, `QUALITY_GATE.md`, `ADMIN_DOMAIN.md`, etc.) — consult these before
non-trivial changes.
