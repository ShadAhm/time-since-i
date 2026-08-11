# CLAUDE.md

Agent instructions for working in this repo.

## Project

`time-since-i` — a Create React App (react-scripts 5.0.1) + TypeScript single-page app, React 18.2. Shows countups ("how long since you did X") for multiple tracked goals. PWA (Workbox service worker, works offline). Deployed to GitHub Pages.

## Commands

- `npm start` — dev server
- `npm run build` — production build
- `npm test` — Jest/RTL via CRA. Note: `src/App.test.tsx` still has the default CRA "learn react" assertion, which no longer matches `App.tsx` — it's stale, not a real regression check.
- `npm run deploy` — runs `predeploy` (build) then publishes `build/` to the `gh-pages` branch on GitHub. This is a real, visible deploy — ask before running it.

No standalone lint/format script or config; linting is CRA's built-in `eslintConfig` (`react-app`, `react-app/jest`), run as part of start/build. No Prettier.

## Structure

```
src/App.tsx                              root component, renders title + CountupCards + footer
src/components/CountupCards/
  CountupCards.tsx                       owns the countup list state, persists on change
  CountupModel.ts                        CountUp type: { id, startDate, title }
src/components/AddNew/
  AddNew.tsx                             form to add a new countup (title + datetime-local)
  LocalStorageUpdater.ts                 reads/writes localStorage key 'countups', seeds sample data on first run
src/components/CountupCard/
  CountupCard.tsx                        one card; ticks every second; date-fns cascading years/months/days/hours/minutes since startDate; remove (×) button
```

Each component is co-located with its own `.scss` file (Sass). No CSS modules, no Tailwind, no styled-components.

## Data

No backend, no database — `localStorage` only, via `LocalStorageUpdater.ts`. This is intentional (see README's "data is not persisted" warning), not a gap to fix.
