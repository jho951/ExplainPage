# 48 - Responsive Breakpoints 768 / 1024 / 1025

## Request

- 중단점을 아래 기준으로 반응형 적용
  - 모바일: 768px 미만
  - 태블릿: 768px 이상 ~ 1024px 이하
  - PC: 1025px 이상
- `:root` 변수 활용 강화

## Applied Changes

- `blog/blog.css`
  - breakpoint 토큰 정리
    - `--bp-md: 768px`
    - `--bp-md-max: 1024px`
    - `--bp-lg: 1025px`
  - root 가변값 분기 정리
    - tablet: `@media (min-width: 768px) and (max-width: 1024px)`
    - pc: `@media (min-width: 1025px)`
  - 기존 `@media (min-width: 1024px)` 계열을 `1025px` 기준으로 상향
  - 표시 유틸 확장
    - `.mobile-only`, `.tablet-only`, `.pc-only`로 3구간 분기

## Note

- 스타일 기본값은 모바일-first로 유지.
- `min-width: 768px` 블록은 태블릿+PC 공통값, `min-width: 1025px` 블록은 PC 전용 오버라이드로 동작.
