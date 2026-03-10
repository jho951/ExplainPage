# Prompt Log

- Timestamp: 2026-02-17 18:53:38 +0900
- User request: 대신 모바일 에서 헤더가 expand 되어야해
- Actions:
  1. Checked mobile expand logic in `components/organisms/header/Header.tsx` (`styles.isExpanded` + `headerExpandContent`).
  2. Added a minimal `@media (max-width: 767px)` block in `components/organisms/header/Header.module.css` to restore mobile expand behavior.
  3. Kept existing `@media (min-height: 768px)` block intact and only added mobile expansion-specific rules.
- Changed files:
  - `components/organisms/header/Header.module.css`
