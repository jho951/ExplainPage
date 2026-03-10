# Prompt Log

- Timestamp: 2026-02-17 22:06:15 +0900
- User request: expanded 전에는 드롭다운이 `display: none`이어야 함
- Actions:
  1. Updated `components/organisms/header/Header.module.css` so `.headerExpandContent` is `display: none` by default.
  2. Added `display: flex` to `.header.isExpanded .headerExpandContent` so dropdown is rendered only in expanded state.
- Changed files:
  - `components/organisms/header/Header.module.css`
