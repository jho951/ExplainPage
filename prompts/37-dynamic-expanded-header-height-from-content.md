# Prompt Log

- Timestamp: 2026-02-17 23:30:09 +0900
- User request: 확장 헤더 내 요소 드롭다운 시 동적으로 헤더 높이 변경
- Actions:
  1. Added dynamic expanded-height calculation to `components/organisms/header/Header.tsx`.
  2. Introduced refs for header/panel and measured content using `panel.scrollHeight`.
  3. Used `ResizeObserver` and `useLayoutEffect` to recalculate height when expanded and when submenu content changes.
  4. Passed computed value to CSS variable `--header-expanded-h` on the header element.
  5. Updated `components/organisms/header/Header.module.css` to use dynamic height:
     - `.header.isExpanded { height: min(var(--header-expanded-h, 560px), 68svh); }`
- Changed files:
  - `components/organisms/header/Header.tsx`
  - `components/organisms/header/Header.module.css`
