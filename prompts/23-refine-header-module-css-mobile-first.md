# Prompt Log

- Timestamp: 2026-02-17 19:00:22 +0900
- User request: 현재 header.module.css를 다듬어서 원하는 요구사항대로 수정
- Actions:
  1. Rewrote `components/organisms/header/Header.module.css` into a clean mobile-first structure.
  2. Kept mobile expand/dropdown behavior as base (`.header.isExpanded` + `.headerExpandContent`).
  3. Separated desktop behavior with `@media (min-width: 768px)` and retained height-based condition with `@media (min-height: 768px)` for header max-width.
  4. Restored all classes used by `Header.tsx` (`btn`, `ghost`, `secondary`, `primary`, `full`, etc.) to avoid missing module class mappings.
- Changed files:
  - `components/organisms/header/Header.module.css`
