# Prompt Log 2: Replace Existing Components with @jho951/ui-components

## Goal

프로젝트의 기존 공용 UI 컴포넌트를 `@jho951/ui-components` 기반으로 교체한다.

## Scope

- 공통 Atom 레이어를 라이브러리 래퍼로 전환
- 전역 스타일에 라이브러리 CSS(reset/theme/utils) 적용
- 기존 호출부 API(`sm/md/lg` 등)는 최대한 유지

## Changed

- `BaseButton`, `BaseInput`, `BaseForm`, `BaseCheckbox`, `BaseSelect`, `BaseLabel`, `Backdrop`, `Spinner`, `Textarea`
- `Breadcrumb`를 라이브러리 컴포넌트로 교체
- 타입 호환 보정(`size` 충돌, 버튼 상수 값)

## Verification

- `npm run _typecheck` 통과
