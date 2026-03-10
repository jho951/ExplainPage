# Prompt Log

- Timestamp: 2026-02-17 22:31:39 +0900
- User request: 헤더 구조/스타일에서 불필요한 것과 중복 요소 정리
- Actions:
  1. Cleaned `components/organisms/header/Header.tsx` by removing redundant root attributes (`id="capsuleHeader"`, `role="banner"`).
  2. Cleaned `components/organisms/header/Header.module.css`:
     - Removed unused animation hint (`will-change: height`).
     - Removed unused classes (`.iconMenu`, `.iconClose`).
     - Removed redundant desktop override (`max-width` duplication and unnecessary `homeBtn` reset block).
     - Fixed formatting inconsistencies.
  3. Restored required button classes used by `Header.tsx` (`.btn`, `.ghost`, `.secondary`, `.primary`, `.full`) to prevent styling gaps.
  4. Verified class usage/definition alignment between `Header.tsx` and `Header.module.css`.
- Changed files:
  - `components/organisms/header/Header.tsx`
  - `components/organisms/header/Header.module.css`
