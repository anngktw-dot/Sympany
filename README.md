# Sympany — Music Discovery Platform

**Role: Frontend Developer · Team project**

Sympany is a music-discovery web application focused on helping users discover tracks, build playlists, and manage a personal music library through a modern responsive interface.

This repository contains the **frontend implementation** of the product, built with **Next.js, React, and TypeScript**.

## Product Features

### Music discovery
- Track-matching flow with **Like / Pass / Undo** interactions
- Match progress and recommendation queue
- Track details including artist, album, mood, BPM, duration, and match percentage
- Liked-track collection during a discovery session

### Library and playlists
- Personal music library interface
- Create local playlists
- Rename and delete playlists
- Add liked tracks to playlists
- Dedicated playlist pages

### Authentication and account flows
- Login
- Registration
- Email verification
- Forgot-password flow
- Reset-password flow
- Client-side form validation
- Profile / settings interface

### Responsive product UI
- Desktop navigation and layouts
- Mobile navigation and responsive screens
- Reusable UI components and page-level widgets

## Spotify Integration Status

The frontend includes the **Spotify connection UI and product flow**, but the repository does not present the Spotify API integration as fully completed. The current implementation uses local/mock track data and local playlist state for the product experience.

## Tech Stack

- **Next.js 15** — App Router
- **React 19**
- **TypeScript**
- **React Hook Form**
- **Zod**
- **CSS Modules**
- **Lucide React**
- **ESLint**
- **Prettier**
- **Husky + lint-staged**
- **GitHub Actions**
- **Vercel** — deployment workflow

## Frontend Architecture

The project uses an **FSD-lite** structure adapted for Next.js:

```text
src/
├── app/        # routes and layouts
├── entities/   # domain models
├── features/   # user actions and business interactions
├── shared/     # reusable UI and utilities
└── widgets/    # composed product sections and pages
```

Current feature areas include:

```text
features/
├── auth/
├── music-match/
└── playlists/
```

More details: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Main Routes

```text
/
/home
/library
/playlist/[playlistId]
/profile
/register
/verify-email
/forgot-password
/reset-password
/change-password
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Create local environment settings:

```bash
cp .env.example .env.local
```

Run the app:

```bash
pnpm dev
```

Open:

```text
http://127.0.0.1:3000
```

## Quality Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format
```

GitHub Actions checks linting, TypeScript safety, and the production build. Husky and lint-staged run formatting and linting before commits.

## What This Project Demonstrates

My work on Sympany focused on the **frontend side of a full product**: implementing product screens and user flows, structuring a scalable Next.js codebase, building typed forms and validation, creating responsive UI, and supporting music-discovery and playlist interactions.
