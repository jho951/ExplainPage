# Prompt Log

- Timestamp: 2026-02-17 23:15:56 +0900
- User request: 디자인 깨짐, 캡슐 안에서 내려오는 형태로 변경
- Actions:
  1. Reverted header expansion from external overlay style back to in-capsule expansion in `components/organisms/header/Header.module.css`.
  2. Restored header container clipping/animation:
     - `overflow: hidden`
     - `transition: height ...`
     - `.header.isExpanded { height: min(85svh, 720px); }`
  3. Restored `.headerExpandContent` to internal flow:
     - `position: relative`
     - `width: 100%`
     - no independent background/border/shadow card styles
     - expanded content height back to `calc(100% - var(--header-h))`
- Changed files:
  - `components/organisms/header/Header.module.css`
