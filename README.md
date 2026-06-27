# Doodle Chat

A small chat app built with React, TypeScript and Vite. It talks to a chat API to load and send messages.

## Trade offs

- **Auth:** there is no login flow — the API has no auth endpoint, it only expects a static Bearer token, so the token is kept in the project (an env var) and sent with every request.

- **`.env` committed:** the `.env` file is intentionally not gitignored so the project is easy to check out and run as-is. In a real project it would of course be gitignored and the token kept out of the repo.

- **New messages via polling:** the app polls the messages endpoint every 5s (`refetchInterval`) to pick up messages from others. It is a pragmatic choice given a plain REST API — a real production chat would use a live connection (WebSocket / SSE) so messages arrive instantly and without constant round-trips.

- **Accessibility:** keyboard and screen reader support are in place, but two design-driven issues remain unaddressed — author/date contrast and the input's focus indicator (subtle border instead of an outline) fall short of WCAG AA.

## Getting started

```bash
yarn
yarn dev
```

The app runs at http://localhost:5173.

## Scripts

- `yarn dev` — start the dev server
- `yarn build` — type-check and build for production
- `yarn preview` — preview the production build
- `yarn lint` — run ESLint
- `yarn test` — run the tests in watch mode
- `yarn test:run` — run the tests once
- `yarn coverage` — run the tests with a coverage report

## Project structure

```
src/
  app/         app shell, providers
  features/
    messages/  message list / item / composer / skeleton, API and hooks
  shared/
    api/        HTTP client and error handling
    ui/         reusable UI components
    lib/        small helpers
  styles/      reset, global styles and design tokens
```
