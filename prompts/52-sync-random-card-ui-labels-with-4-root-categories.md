# 52 - Sync Random Card UI Labels With 4 Root Categories

## Request

- random 카드 UI도 4개 실제 루트 카테고리와 완전히 일치시켜 달라는 요청

## Applied Changes

- `blog/blog.html`
  - Random 섹션의 4개 카드 모두 실제 루트 카테고리로 변경
    - ComputerScience
    - Development
    - Engineering
    - Trouble Shooting
  - 각 카드의 `data-cat`, `data-list`, `data-rss`를 동일 기준으로 정렬
  - 카드 표시 타이틀(Front-end/Back-end/Infra/CS) 제거 후 실제 이름 반영

## Note

- `random-post-box.js`는 이미 canonical 4개 카테고리로 동작하도록 고정되어 있어,
  UI/동작 양쪽 모두 동일한 카테고리 체계를 사용함.
