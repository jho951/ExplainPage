# 54 - CAT PC Single Column With Category Images

## Request

- PC에서 cat 영역을 4분할하지 말고, 카테고리별로 width 100% 한 줄씩 표시
- 카테고리 이미지 추가 및 디자인 개선

## Applied Changes

- `blog/blog.css`
  - PC (`>=1025px`)에서 `.category-full-wrapper`를 2열 grid -> 세로 1열 flex로 변경
    - 각 카테고리 섹션이 `width: 100%` 한 줄씩 배치됨
  - 카테고리 인트로 비주얼 컴포넌트 스타일 추가
    - `.category-visual`, `.category-visual img`
    - 브레이크포인트별 높이 변수 `--category-visual-h`
  - 카테고리 인트로/카드 hover 및 spacing 미세 조정
- `blog/blog.html`
  - 각 카테고리 인트로에 `figure.category-visual > img` 추가
    - ComputerScience / Development / Engineering / Trouble Shooting

## Note

- 기존 GNB 동기화 로직은 카드 링크/텍스트를 계속 실제 카테고리 기준으로 갱신함.
