# Prompt Log 4: Remove Editor Feature

## Goal

프로젝트에서 editor 기능을 완전히 제거한다.

## Scope

- `/edit`, `/[lang]/edit` 라우트 삭제
- editor 전용 스타일 삭제
- `@uiw/react-md-editor` 의존성 제거
- 요구사항 문서에 editor 제거 정책 반영

## Verification

- 코드베이스에서 edit 라우트 및 editor 의존성 참조가 남지 않음
- 전체 타입체크는 기존 다른 모듈 삭제 이슈로 실패(본 작업 범위 외)
