# Doodle Chat

A small chat app built with React, TypeScript and Vite. It has session-based auth and talks to a chat API to load and send messages.

## Getting started

```bash
yarn install
yarn dev
```

The app runs at http://localhost:5173.

## Scripts

- `yarn dev` — start the dev server
- `yarn build` — type-check and build for production
- `yarn preview` — preview the production build
- `yarn lint` — run ESLint

## Project structure

```
src/
  app/         app shell and providers
  features/
    session/   login / session handling
    messages/  message list, composer, API and hooks
  shared/
    api/        HTTP client and error handling
    ui/         reusable UI components
    lib/        small helpers
```
