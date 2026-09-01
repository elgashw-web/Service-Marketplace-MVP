# مَعُون — Service Marketplace

An Arabic-first RTL service marketplace MVP that connects beneficiaries with people and businesses offering helpful services.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/service-marketplace/src/App.tsx` — route-level screens, reusable shell, local demo session, role selection, and profile state
- `artifacts/service-marketplace/src/index.css` — shared visual tokens, RTL-friendly typography, surfaces, and motion utilities
- `artifacts/service-marketplace/src/pages/not-found.tsx` — fallback route
- `artifacts/api-server` and `lib/api-*` — shared backend/API foundation retained for later marketplace capabilities

## Architecture decisions

- The first MVP is frontend-first and does not add marketplace, payment, or reputation data before the core journey is validated.
- The access flow is explicitly labeled as a local demo session until a managed auth provider is connected.
- The selected account type and basic profile are persisted in local storage so navigation and reloads feel functional without inventing a backend contract.
- Beneficiary and provider home screens share the same app shell and profile surface, while role-specific content stays isolated for later expansion.

## Product

- Welcomes new users in Arabic and guides them into the platform.
- Supports a local demo sign-up/login experience and role selection.
- Provides distinct beneficiary and service-provider starting points.
- Includes a basic profile view with editable local information and sign-out.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
