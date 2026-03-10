# Prompt Log

- Timestamp: 2026-02-17 19:03:06 +0900
- User request: app/styles 안의 css들이 global.css일 때 어떻게 수정해야 하는지
- Actions:
  1. Created `app/globals.css` as the single global stylesheet entrypoint.
  2. Moved global imports into `app/globals.css` via `@import`:
     - `@/app/styles/reset.css`
     - `@/app/styles/font.css`
     - `@/app/styles/theme.css`
     - `@/app/styles/class.css`
  3. Updated `app/layout.tsx` to import only `@/app/globals.css`.
- Changed files:
  - `app/globals.css`
  - `app/layout.tsx`
