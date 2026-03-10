# 13) Redesign Header Similar to craft.do

## Prompt

현재 헤더 디자인을 craft.do 사이트 헤더와 동일하게 디자인 해줘

## Work Summary

- Refactored header layout to a craft-like structure:
  - top announcement pill bar
  - rounded floating main nav bar
  - centered desktop navigation
  - right-side desktop actions (`Sign in`, `Get started`)
  - mobile menu button retained with drawer flow
- Updated styles to match the requested visual direction (light glass background, soft borders/shadows, pill buttons, cleaner spacing).

## Files Updated

- `components/organisms/header/Header.tsx`
- `components/organisms/header/Header.module.css`

## Validation

- Ran `npm run _typecheck`.
