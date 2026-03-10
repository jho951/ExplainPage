# Prompt Log

- Timestamp: 2026-02-17 22:49:45 +0900
- User request: 헤더 확장 영역이 페이지 레이아웃에 영향을 주지 않게 수정
- Actions:
  1. Updated `components/organisms/header/Header.module.css` to keep header height fixed in expanded state (`.header.isExpanded { height: var(--header-h); }`).
  2. Switched `.headerExpandContent` to overlay behavior using absolute positioning below header:
     - `position: absolute`
     - `top: calc(100% + 10px)`
     - expanded width, max-height, and scroll container settings
  3. Applied visual container styles (background/blur/border/radius/shadow) directly on overlay dropdown.
  4. Kept root header overflow visible so the overlay can render outside without pushing page content.
- Changed files:
  - `components/organisms/header/Header.module.css`
