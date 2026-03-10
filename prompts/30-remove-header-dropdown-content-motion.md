# Prompt Log

- Timestamp: 2026-02-17 22:16:39 +0900
- User request: 열리고 닫힐 때 들썩거림 제거, 내려올 때 요소 움직임 제거
- Actions:
  1. Removed dropdown content motion styles from `components/organisms/header/Header.module.css`.
  2. In `.headerExpandContent`, removed `opacity`, `visibility`, `transform`, `pointer-events`, and related transitions.
  3. Kept open/close control purely by `display: none` -> `display: flex` under `.header.isExpanded .headerExpandContent`.
- Changed files:
  - `components/organisms/header/Header.module.css`
