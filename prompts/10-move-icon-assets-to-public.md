# 10) Use public/assert/icons for @jho951/ui-components Icon

## Prompt

그럼 asserts/icons를 전부 public 폴더로 옮겨야해?
그렇게 그럼 적용해줘

## Work Summary

- Copied all `assets/icons/*.svg` into `public/assert/icons/` for URL-based icon loading.
- Updated icon usage to URL mode with explicit base path:
  - `components/organisms/header/Header.tsx`
  - `components/molecules/logo/Logo.tsx`
  - `components/molecules/footer-meta/FooterMeta.tsx`
- Replaced invalid mobile menu icon name/path (`open`, relative src) with `hamburger` from public icon set.

## Validation

- Ran `npm run _typecheck`.
