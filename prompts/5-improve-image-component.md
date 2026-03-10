# Prompt Log 5: Improve Image Atom for Practical Reuse

## Goal

`components/atoms/Image/Image.tsx`를 실무 재사용성이 높은 형태로 개선한다.

## Scope

- width/height 누락 시 안전한 fill 동작
- 컨테이너/이미지 스타일 분리 (`containerClassName`, `containerStyle`)
- fallback 이미지 처리 안정화
- skeleton 및 로딩 콜백 처리 개선

## Verification

- `npx eslint components/atoms/Image/Image.tsx components/atoms/Image/Image.types.ts` 통과
