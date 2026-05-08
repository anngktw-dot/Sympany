# Frontend Architecture

## Stack Decision

- Framework: `Next.js` with `App Router`
- Language: `TypeScript`
- Architecture: `FSD-lite` adapted for Next.js
- Styling: `CSS Modules` for predictable local styles
- UI base: custom design system in `shared/ui`, with the option to add `shadcn/ui` later if the product grows
- Utilities: `clsx` + `tailwind-merge` via `cn()` helper for class composition

## Why This Setup

- `Next.js` gives SSR/SSG, routing, layouts, metadata, and a strong default for production frontend apps.
- `TypeScript` is required for safe scaling and shared domain contracts.
- `FSD-lite` is a good balance here:
  - lighter than full enterprise DDD on the frontend
  - much cleaner than a flat `components/` dump
  - works naturally with Next.js `app` routes
- `CSS Modules` fit this project better than CSS-in-JS:
  - zero runtime styling cost
  - easy pixel-perfect layout work
  - simple onboarding
- `MUI` / `Ant Design` were intentionally not chosen:
  - they would fight the custom visual design
  - too much visual override cost for auth/product marketing screens

## Recommended Structure

```txt
src/
  app/           # Next routes, layouts, metadata
  shared/        # ui kit, utils, config, constants
  entities/      # business entities
  features/      # user actions/use cases
  widgets/       # composed page sections
```

## Current Convention

- `app/` owns routing only
- `widgets/` owns page-level composed UI
- `features/` owns user scenarios and form behavior
- `shared/` owns reusable helpers and base primitives
- `entities/` is reserved for future domain objects once auth/profile data starts living in the app

## Import Aliases

- `@/*`
- `@/app/*`
- `@/shared/*`
- `@/widgets/*`
- `@/features/*`
- `@/entities/*`

## Quality Gates

- ESLint for code rules
- Prettier for formatting
- Husky + lint-staged for pre-commit checks
- GitHub Actions CI for lint + typecheck + build
- GitHub Actions CD workflow prepared for `Vercel`

## Libraries Chosen

- Forms: `react-hook-form` + `zod`
- Validation bridge: `@hookform/resolvers`
- Icons: `lucide-react`

## Future Recommended Libraries

When the app grows, add selectively:

- Server state: `@tanstack/react-query` if API complexity grows
- UI primitives: `shadcn/ui` only where reusable primitives are needed
- Tests: `vitest` + `@testing-library/react` + `playwright`

## What We Are Not Choosing Right Now

- `DDD` as a strict frontend architecture:
  too heavy for the current scope
- `Tailwind` as the main styling layer:
  fast for product teams, but less convenient here for precise custom auth layouts
- `MUI` / `Ant Design`:
  strong for dashboards, weak fit for this custom branded UI
