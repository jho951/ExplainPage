# Prompt Log

- Timestamp: 2026-02-17 21:34:12 +0900
- User request: 현재 코드에서 헤더 css 다듬어서 캡슐 형태 잘 나타나게 수정
- Actions:
  1. Updated header-specific design tokens in `components/organisms/header/Header.module.css` to decouple from global `--header-height`.
  2. Changed sticky offset to `top: var(--header-top)` and header height to `--header-h` for stable capsule placement.
  3. Set collapsed capsule radius to `999px` and expanded radius to `32px` to keep pill shape while allowing dropdown expansion.
  4. Aligned desktop max-width usage to the same local `--header-max` token.
- Changed files:
  - `components/organisms/header/Header.module.css`
