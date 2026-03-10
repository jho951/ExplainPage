# Prompt Log

- Timestamp: 2026-02-17 22:25:29 +0900
- User request: 드롭다운 시 요소 들썩거림 제거 + 다크모드에서 로고 흰색 적용
- Actions:
  1. Stabilized header expand/collapse layout in `components/organisms/header/Header.module.css`:
     - Added `will-change: height` to header container.
     - Switched expanded height to `min(85svh, 720px)` for mobile viewport stability.
     - Fixed top row sizing with `flex: 0 0 var(--header-h)` on `.headerInner`.
     - Changed dropdown area to fixed computed height in expanded state: `height: calc(100% - var(--header-h))`.
     - Added `scrollbar-gutter: stable` and separated `overflow-x/y` to reduce layout jumps.
  2. Ensured desktop nav hidden logic is explicit (`display: none` base, `display: flex` on desktop breakpoint).
  3. Added dark-mode logo styling in `components/molecules/logo/Logo.module.css`:
     - `:global(html.dark) .icon { filter: brightness(0) invert(1); }`
- Changed files:
  - `components/organisms/header/Header.module.css`
  - `components/molecules/logo/Logo.module.css`
