# Prompt Log 6: Apply UI Components Across Project Components

## Goal

남아있는 컴포넌트 구현을 `@jho951/ui-components` 중심으로 정리하고, 깨진 참조를 복구한다.

## Scope

- `Header`를 `Button`, `Drawer`, `Menu`, `BackDrop` 기반으로 재구성
- `FooterMeta`를 `Dropdown` API(`items`, `onSelect`)에 맞게 수정
- `Link` 유틸을 `cn`(`@jho951/ui-components`) 사용으로 정리
- 누락된 `SignInTemplate`, `CaptchaScript`, `RssScript` 컴포넌트 복구
- `IconName` 타입을 라이브러리 타입으로 교체

## Verification

- `npm run _typecheck` 통과
- 변경 파일 대상 ESLint 통과
