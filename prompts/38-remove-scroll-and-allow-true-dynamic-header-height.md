# Prompt Log

- Timestamp: 2026-02-17 23:40:03 +0900
- User request: 확장 높이가 안 변하고 스크롤이 생김
- Actions:
  1. Removed CSS constraints that forced internal scrolling in `components/organisms/header/Header.module.css`.
  2. Changed `.header.isExpanded` to use pure dynamic height variable:
     - from `min(var(--header-expanded-h, 560px), 68svh)`
     - to `var(--header-expanded-h, 560px)`
  3. Changed `.headerExpandContent` overflow from axis-scroll to `overflow: visible`.
  4. Removed fixed expanded content height (`height: calc(100% - var(--header-h))`) so content height can naturally determine header height.
- Changed files:
  - `components/organisms/header/Header.module.css`
