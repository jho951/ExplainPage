# Prompt Log

- Timestamp: 2026-02-17 23:25:22 +0900
- User request: 헤더 fixed 상단 고정 + 페이지에서 헤더만큼 여백 + 헤더 정중앙 정렬
- Actions:
  1. Updated `components/organisms/header/Header.module.css` to center fixed header:
     - `position: fixed`
     - `left: 50%`
     - `transform: translateX(-50%)`
  2. Added `contexts/client/ClientContext.module.css` with content top offset:
     - `.contentWithHeader { padding-top: 92px; }`
  3. Updated `contexts/client/ClientContext.tsx` to apply top offset only when header is shown.
- Changed files:
  - `components/organisms/header/Header.module.css`
  - `contexts/client/ClientContext.tsx`
  - `contexts/client/ClientContext.module.css`
