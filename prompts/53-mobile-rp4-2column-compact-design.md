# 53 - Mobile RP4 2-Column Compact Design

## Request

- 모바일에서 랜덤 카드가 4개 세로로 길게 나열되어 안 예쁜 문제 개선

## Applied Changes

- `blog/blog.css`
  - 모바일 기본을 2열 카드로 변경
    - `--rp4-cols: repeat(2, minmax(0, 1fr))`
  - 모바일 카드/아이콘/텍스트를 컴팩트하게 축소
    - `--rp4-card-py/px`, `--rp4-icon-size/fz`, `--rp4-title-fz`, `--rp4-gap`
  - 카드 높이 균일화
    - `.rp4-card { min-height: 160px; }`
  - 아이콘 위치 미세 정렬
    - `.rp4-icon { margin: 0 auto 4px; }`
  - 태블릿/PC에서는 변수 오버라이드로 적절히 재확대

## Result

- 모바일에서 랜덤 카드가 2x2 형태로 더 짧고 균형 있게 보이며,
  스크롤 길이와 시각 밀도가 개선됨.
