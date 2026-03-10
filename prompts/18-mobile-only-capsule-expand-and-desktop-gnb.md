# 18) Mobile-only Capsule Expand + Desktop GNB List

## Prompt

여기서는 검색은 없애주고 캡슐 확장 형태는 모바일에서만 적용되게 하고 pc 에서는 기존의 형태로 gnb가 나열되어있게 해줘야해

## Work Summary

- Removed search UI and search logic from header.
- Split behavior by viewport:
  - Mobile: capsule header expands/collapses with menu button.
  - Desktop: no capsule expansion, GNB is listed inline in the header.
- Kept desktop submenu dropdown behavior via existing `Menu` component.
- Kept mobile expanded panel accordion behavior for category/subcategory.

## Files Updated

- `components/organisms/header/Header.tsx`
- `components/organisms/header/Header.module.css`

## Validation

- Ran `npm run _typecheck`.
