# 12) Merge `public/assert/icons` into `public/icons`

## Prompt

그 다음 public 디렉토리에서 assert로 따로 뺴지말고 icons 안에 하나로 모아줘

## Work Summary

- Moved all SVG files from `public/assert/icons` to `public/icons`.
- Removed empty `public/assert/icons` and `public/assert` directories.
- Updated icon base paths from `'/assert/icons'` to `'/icons'` in:
  - `components/organisms/header/Header.tsx`
  - `components/molecules/logo/Logo.tsx`
  - `components/molecules/footer-meta/FooterMeta.tsx`

## Validation

- Verified no remaining `/assert/icons` references.
- Ran `npm run _typecheck`.
