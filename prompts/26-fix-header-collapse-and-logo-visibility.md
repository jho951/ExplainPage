# Prompt Log

- Timestamp: 2026-02-17 21:35:30 +0900
- User request: 접힐 때 캡슐이 이상하게 보이는 문제 + 헤더 로고 미노출 에러 수정
- Actions:
  1. Tuned collapse/expand transitions in `components/organisms/header/Header.module.css`:
     - Added `border-radius` transition on `.header`
     - Reduced closing opacity duration and removed delayed `visibility` transition in `.headerExpandContent`
  2. Stabilized logo area in header style by adding explicit anchor layout under `.homeBtn a`.
  3. Replaced header logo rendering in `components/molecules/logo/Logo.tsx` from external Icon component to direct `next/image` load of `/icons/logo.svg`.
  4. Added `components/molecules/logo/Logo.module.css` for deterministic logo sizing/layout.
- Changed files:
  - `components/organisms/header/Header.module.css`
  - `components/molecules/logo/Logo.tsx`
  - `components/molecules/logo/Logo.module.css`
