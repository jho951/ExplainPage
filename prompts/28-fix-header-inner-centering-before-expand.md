# Prompt Log

- Timestamp: 2026-02-17 21:55:30 +0900
- User request: expand 전 헤더 내 요소 중앙 정렬 문제 수정
- Actions:
  1. Updated `components/organisms/header/Header.module.css` to center logo in mobile header using absolute centering on `.homeBtn`.
  2. Kept action button aligned right by setting `.gnbBtn { margin-left: auto; }` and z-index layering.
  3. Added desktop reset in `@media (min-width: 768px)` for `.homeBtn` position and `.gnbBtn` margin.
- Changed files:
  - `components/organisms/header/Header.module.css`
