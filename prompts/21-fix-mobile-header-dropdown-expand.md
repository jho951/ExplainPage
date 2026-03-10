# Prompt Log

- Timestamp: 2026-02-17 18:54:50 +0900
- User request: 헤더가 아래로 드롭다운 되지 않아
- Actions:
  1. Updated mobile expand styles in `components/organisms/header/Header.module.css` to use `.header.isExpanded` selector.
  2. Switched animation axis from `max-height` to `height` and restored explicit `display: flex; flex-direction: column;` on mobile header.
  3. Updated nested expanded selectors for `headerExpandContent` to `.header.isExpanded ...`.
- Changed files:
  - `components/organisms/header/Header.module.css`
