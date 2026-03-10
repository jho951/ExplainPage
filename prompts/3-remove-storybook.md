# Prompt Log 3: Remove Storybook

## Goal

프로젝트에서 Storybook 관련 설정, 코드, 의존성을 모두 제거한다.

## Scope

- `.storybook/`, `stories/`, `*.stories.*` 파일 삭제
- Storybook 스크립트 및 패키지 의존성 제거
- Storybook ESLint/Vitest/타입 참조 제거

## Verification

- 저장소 전체 검색에서 `storybook` 직접 참조 제거 확인
