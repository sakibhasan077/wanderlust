# AGENTS.md

Fresh `create-next-app` scaffold: Next.js 16.4.3 (App Router, `src/app/`), React 19, TypeScript, Tailwind CSS v4. No backend, no tests, no CI yet.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`)
- No typecheck script; run `npx tsc --noEmit` if needed. No test runner exists.

## Toolchain quirks (differ from older Next.js defaults)

- **Tailwind v4 is CSS-first**: no `tailwind.config`. Theme lives in `src/app/globals.css` (`@theme inline`, `@custom-variant dark`). The Tailwind Turbopack loader is wired in `next.config.ts` via `turbopack.rules`.
- **React Compiler is on** (`reactCompiler: true` + `babel-plugin-react-compiler`). Components must follow React Compiler rules: no side effects or mutations during render.
- **`cacheComponents: true` and `partialPrefetching: true`** in `next.config.ts` — caching/prefetch semantics differ from classic Next.js. Consult `node_modules/next/dist/docs/` before writing data fetching or cache code.
- **shadcn uses the `base-nova` style on `@base-ui/react`, not Radix.** Generated/ui components (`src/components/ui/`) import from `@base-ui/react`; don't paste Radix-based shadcn code. `components.json` configures the `shadcn` CLI.
- **`cn` is the `cn` npm package**, re-exported from `src/lib/utils.ts` — not the usual `clsx` + `tailwind-merge` combo.
- Path alias: `@/*` → `src/*`.

## Do not edit

The `<!-- BEGIN:nextjs-agent-rules -->` block below is auto-generated and re-added by `next dev` (`node_modules/next/dist/server/lib/generate-agent-files.js`). Keep it when committing; don't delete it from diffs.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
