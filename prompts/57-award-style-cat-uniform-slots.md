# 57 - Award-style CAT With Uniform Slots

## Request

- PC에서 하위 개수 불균형으로 CAT 영역이 안 예쁜 문제 개선
- 최근 수상 사이트 톤을 참고해 CAT 영역 UI/UX 개선

## Reference Used

- Awwwards (latest nominees/SOTD feed): https://www.awwwards.com/
- CSS Design Awards (awarded list): https://www.cssdesignawards.com/
- CSS Winner (SOTD archive): https://www.csswinner.com/winners/6

## Applied Changes

- `blog/ui-features.js`
  - CAT 렌더링을 고정 슬롯(4개) 방식으로 변경 (`DISPLAY_SLOTS = 4`)
  - 하위 카테고리 수가 적을 때: ghost 카드(`Coming soon`)로 채워 시각적 균형 유지
  - 하위 카테고리 수가 많을 때: 마지막 슬롯을 `+N more` 카드로 처리
  - 루트 타이틀/설명도 동기화
- `blog/blog.css`
  - CAT 카드 그리드를 기본 2열, PC 4열로 통일
  - `cat-card--ghost`, `cat-card--more` 상태 스타일 추가
  - 카드 최소 높이 통일로 불균형 완화

## Result

- 루트별 하위 개수가 달라도 각 섹션의 카드 면적/리듬이 일정해져
  PC/모바일 모두 일관된 UI를 유지.
