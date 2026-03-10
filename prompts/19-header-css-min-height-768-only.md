# Prompt Log

- Timestamp: 2026-02-17 18:50:30 +0900
- User request: Header.tsx css를 min-height:768px 중단점으로만 적용하게 수정
- Actions:
  1. Located `components/organisms/header/Header.tsx` and `components/organisms/header/Header.module.css`.
  2. Wrapped all header CSS rules in `@media (min-height: 768px)` so styles apply only at that viewport height breakpoint and above.
- Changed files:
  - `components/organisms/header/Header.module.css`
