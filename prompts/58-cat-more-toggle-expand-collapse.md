# 58 - CAT +N more Toggle Expand/Collapse

## Request

- `+N more` 카드 클릭 시 페이지 이동 대신 섹션 내부에서 펼침/접기 동작 구현

## Applied Changes

- `blog/ui-features.js`
  - CAT 렌더링을 섹션별 `renderCards()` 방식으로 변경
  - 하위 카테고리 수가 4개 초과일 때:
    - 기본: 앞 3개 + `+N more`
    - 클릭: 전체 하위 카테고리 표시 + `접기` 토글 카드
  - `Enter`/`Space` 키보드 접근성 동작 추가
  - 섹션 상태를 `section.__catExpanded`로 관리

## Validation

- `node --check blog/ui-features.js` 통과
