# 46 - Add FE Leaf Categories And Leaf Sync

## Request

- Engineering 아래에 DesignPattern, Test
- Trouble Shooting 아래에 Performance가 반영되도록 추가

## Applied Changes

- `blog/blog.html`
  - FE 섹션(`data-root-cat="FE"`) 재추가
  - 카드 fallback을 최하위 카테고리 기준으로 구성
    - DesignPattern
    - Test
    - Performance
- `blog/ui-features.js`
  - `getSubLinks()`를 리프(최하위) 카테고리 수집 방식으로 개선
  - 중첩 카테고리 구조에서 부모(Engineering, Trouble Shooting)는 건너뛰고
    최하위(DesignPattern, Test, Performance)를 카드에 매핑
  - 리프 수집 실패 시 기존 anchor 전체 수집으로 fallback

## Validation

- `node --check blog/ui-features.js` 통과
