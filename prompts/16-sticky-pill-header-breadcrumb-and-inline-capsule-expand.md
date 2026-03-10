# 16) Sticky Pill Header + Breadcrumb + Inline Capsule Expand

## Prompt

현재 따로 모달 형태로 떠버리는 디자인이야 이게 아니고

- Pill Shape (캡슐형)
- Breadcrumbs (상위 > 현재, 클릭 시 드롭다운)
- Blur Effect + Sticky

## Work Summary

- Removed modal-style mobile drawer usage from header flow.
- Implemented inline capsule expansion under the header (`mobileCapsule`) instead of floating modal/portal overlay.
- Updated header container to sticky pill style with translucent background and blur (`backdrop-filter`).
- Added breadcrumb trigger in header (`상위 > 현재`) with dropdown menu on click.
- Kept existing navigation and actions while aligning with requested behavior.

## Files Updated

- `components/organisms/header/Header.tsx`
- `components/organisms/header/Header.module.css`

## Validation

- Ran `npm run _typecheck`.
