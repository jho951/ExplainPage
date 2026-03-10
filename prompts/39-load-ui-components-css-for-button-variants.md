# Prompt Log

- Timestamp: 2026-02-17 23:42:14 +0900
- User request: Button의 ui-components variant CSS 미적용 문제 수정
- Actions:
  1. Identified that `@jho951/ui-components` JS exports do not auto-import component CSS.
  2. Added global stylesheet import to load variant styles:
     - `@import '../node_modules/@jho951/ui-components/dist/index.css';`
  3. Appended it in `app/globals.css` so UI component classes (including Button variants) are available app-wide.
- Changed files:
  - `app/globals.css`
