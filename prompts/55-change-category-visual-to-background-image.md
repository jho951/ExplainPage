# 55 - Change Category Visual To Background Image

## Request

- cat 영역 이미지를 `<img>` 요소가 아니라 배경 이미지 방식으로 변경

## Applied Changes

- `blog/blog.html`
  - 각 카테고리 visual을 빈 figure + 클래스 방식으로 변경
    - `category-visual-cs`
    - `category-visual-dev`
    - `category-visual-eng`
    - `category-visual-ts`
  - 기존 figure 내부 `<img>` 제거
- `blog/blog.css`
  - `.category-visual`를 배경 렌더링 컨테이너로 변경
    - `height: var(--category-visual-h)`
    - `background-size/position/repeat`
  - 카테고리별 배경 이미지 + 오버레이 gradient 추가
  - 더 이상 필요 없는 `.category-visual img` 스타일 제거
