# 42 - Sync Cat Section Cards With GNB Categories

## Request

- 하단 cat 영역의 카드 링크/제목이 GNB 카테고리를 따르도록 수정

## Applied Changes

- `blog/blog.html`
  - 카테고리 섹션에 루트 매핑 키 추가
    - `data-root-cat="CS"`
    - `data-root-cat="FE"`
    - `data-root-cat="BE"`
    - `data-root-cat="INFRA"`
- `blog/ui-features.js`
  - `initCategoryCardsFromGnb()` 추가
    - GNB(`ttHeaderPanel`)의 실제 카테고리/하위 카테고리 링크를 읽음
    - cat 카드(`.cat-card`)의 `href`와 `.cat-name`을 GNB 기준으로 동기화
    - 하위 카테고리 수가 카드 수보다 적으면 남는 카드는 숨김 처리
    - 섹션 intro 버튼(`.category-intro .btn`)도 루트 카테고리 링크로 교체
  - DOM ready 초기화에 `initCategoryCardsFromGnb()` 연결

## Validation

- `node --check blog/ui-features.js` 통과
- 데이터 속성 및 초기화 호출 반영 확인

## Note

- 이제 cat 영역은 하드코딩 링크가 아니라 GNB 카테고리 구조를 우선으로 반영함.
