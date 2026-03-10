# 44 - Replace Cat Block With Real GNB Names

## Request

- 하단 cat 영역 HTML 자체를 GNB 실제 카테고리 이름 기준으로 교체

## Applied Changes

- `blog/blog.html`
  - cat 섹션을 실제 루트 카테고리 3개 기준으로 정리
    - `ComputerScience`
    - `Development`
    - `FE`
  - 기존 하드코딩 섹션 제거/교체
    - `Back End` 섹션 -> `FE` 섹션으로 교체
    - `Infrastructure` 섹션 삭제
  - Development 카드 목록을 실제 하위 카테고리로 교체
    - Language / Framework / Infra / DataBase / Tool
  - FE 카드 목록을 실제 하위 카테고리로 교체
    - Engineering / DesignPattern / Test / Trouble Shooting / Performance

## Note

- 기존 JS 동기화(`initCategoryCardsFromGnb`)가 최종적으로 GNB 실데이터 링크/이름을 다시 반영하므로,
  현재 HTML은 정확한 fallback 역할을 수행함.
