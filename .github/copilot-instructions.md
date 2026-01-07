This repository is a Next.js 16 portfolio + blog (App Router) with i18n and MDX-based blog posts.

Quick context
- Framework: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.
- Content: Blog posts live in `content/blog/en` and `content/blog/zh` as `.mdx` files.
- I18n: `next-intl` is configured in `next.config.ts` and `src/i18n/*`.
- Building: use the scripts in `package.json` (`pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`).

What AI agents should know (actionable)
- Project entry points: `src/app/layout.tsx` (global CSS) and `src/app/[locale]/layout.tsx` (locale-aware layout, metadata).
- Blog pipeline: `src/lib/blog.ts` reads `.mdx` files, uses `gray-matter` for frontmatter, and a `unified` pipeline (`remark` → `rehype` plugins) to produce HTML. If you update rendering or code-highlighting, check this file first.
- Markdown rendering: `src/components/react-markdown.tsx` wraps `react-markdown` and handles images specially (uses `next/image` except for shields.io). Follow this pattern when adding custom Markdown components.
- Metadata and SEO: `src/lib/metadata.ts` and `src/components/jsonld-scripts.tsx` are used in page metadata generation — prefer updating `constructMetadata` rather than scattering tags.
- i18n routing: `src/i18n/routing.ts` and `src/i18n/request.ts` drive locale checks; `LocaleLayout` uses `NextIntlClientProvider` so server/client message loading matters.

Conventions and patterns
- Add blog posts as `.mdx` with YAML frontmatter: `title`, `date`, `summary` (readingTime is computed). Example:
  ```md
  ---
  title: "My Post"
  date: "2025-01-01"
  summary: "Short summary"
  ---
  ```
- Images in MDX: use standard Markdown image syntax. If source contains `img.shields.io`, the code uses a plain `<img>` tag; otherwise `next/image` is used (see `CustomImage`).
- Path alias: code uses `@/` → `src/` (see `tsconfig.json`). Use that alias in imports for consistency.
- No tests: repository doesn't include test runner; avoid adding test assumptions without confirming with the maintainer.

Build & debug notes
- Local dev: `pnpm dev` (or `npm run dev`). Node engine required: `>=18.18.0 <=22` (see `package.json` "engines").
- To reproduce production build: `pnpm build` then `pnpm start` (or run preview on Vercel). Use `pnpm analyze` for bundle analysis.
- Lint/format: `pnpm lint` and Prettier is configured. Use `prettier` with `prettier-plugin-tailwindcss` for class ordering.

Integration points to watch
- Vercel features: `@vercel/analytics`, `@vercel/og`, and `@vercel/speed-insights` are conditionally used in `LocaleLayout`.
- Third-party tags: `src/components/third-party/*` contains GTM and Baidu verification components — be careful when toggling these in production code.
- Reading time and locale logic: `src/lib/blog.ts` uses different reading speed for `en` vs `zh` — maintain this if you change reading-time logic.

Editor guidance for code edits
- Small UI/UX change: update components under `src/components/*` (follow existing Tailwind + class-variance-authority patterns).
- MDX/rendering changes: update `src/lib/blog.ts` (parsing) and `src/components/react-markdown.tsx` (client rendering). Run `pnpm dev` to verify pages that render MDX.
- Adding locales: update `src/i18n/messages/*`, `src/i18n/routing.ts`, and ensure `next-intl` hooks still work.

If you are unsure about a change
- Look for existing patterns first: e.g., how `Navbar`, `Footer`, and `LocaleLayout` wire providers and third-party scripts.
- Ask for clarification before changing global metadata generation or the MDX pipeline.

If you want me to expand this with examples or tests, say which area (MDX rendering, i18n, or metadata) and I will add targeted examples.
