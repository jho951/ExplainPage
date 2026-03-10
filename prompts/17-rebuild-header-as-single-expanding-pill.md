# 17) Rebuild Header as Single Expanding Pill

## Prompt

메뉴 버튼을 누르면 아래로 내려오는 단일 캡슐 헤더 구조로 구현하고, 예시 HTML/CSS 스타일처럼 만들기

## Work Summary

- Replaced header structure with a single capsule component that expands by height within itself.
- Implemented sticky + blur glass header style.
- Added search toggle behavior in header inner section.
- Implemented category accordion in expanded area.
- Added expanded footer actions (`구독하기`, `로그인`, `회원가입`).
- Updated style and behavior to follow provided pattern (not modal overlay).

## Files Updated

- `components/organisms/header/Header.tsx`
- `components/organisms/header/Header.module.css`

## Validation

- Ran `npm run _typecheck`.
