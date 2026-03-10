# 43 - Align Cat Sections To Real Tistory Categories

## Request

- 실제 티스토리 카테고리 구조(ComputerScience / Development / FE)에 맞춰 cat 영역 동기화

## Applied Changes

- `blog/blog.html`
  - `data-root-cat` 매핑 변경
    - cs -> `ComputerScience`
    - fe -> `Development`
    - be -> `FE`
    - infra -> `INFRA` (매칭 실패 시 숨김 처리 대상)
- `blog/ui-features.js`
  - `initCategoryCardsFromGnb()`에서 루트 카테고리 미매칭 시 섹션 전체 숨김 처리
  - 매칭 성공 시 섹션 표시 복구

## Validation

- `node --check blog/ui-features.js` 통과

## Note

- 하위 카테고리 링크/이름은 계속 GNB에서 읽어와 cat 카드에 반영됨.
