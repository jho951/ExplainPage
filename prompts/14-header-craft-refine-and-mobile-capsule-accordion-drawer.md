# 14) Refine Header + Mobile Capsule Accordion Drawer

## Prompt

해주고 drawer가 확장되는 것도 아래로 아코디언 되듯이 캡슐이 내려오는 형태여야 해

## Work Summary

- Refined header visuals closer to craft-like tone:
  - softer announcement bar
  - tighter pill nav proportions and spacing
  - polished desktop nav/button sizing
- Changed mobile drawer behavior from side panel to top capsule drop-down:
  - Added `top` placement to local Drawer type and styles
  - Added top drop animation and capsule-style panel shape
- Reworked mobile navigation into accordion sections:
  - section trigger buttons
  - chevron rotation state
  - animated panel expand/collapse
  - mobile bottom actions (`Sign in`, `Get started`)

## Files Updated

- `ui/Drawer.types.ts`
- `ui/Drawer.module.css`
- `components/organisms/header/Header.tsx`
- `components/organisms/header/Header.module.css`

## Validation

- Ran `npm run _typecheck`.
