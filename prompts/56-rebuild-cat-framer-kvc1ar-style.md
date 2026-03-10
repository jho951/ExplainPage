# 56 - Rebuild CAT In Framer-kvc1ar Style

## Request

- `draftx.co.kr`의 `framer-kvc1ar` 느낌으로 cat 섹션 재구성
- PC에서도 카테고리 섹션은 한 줄씩 width 100% 유지
- 카테고리 이미지는 배경 이미지 방식

## Applied Changes

- `blog/blog.html`
  - cat wrapper에 `framer-kvc1ar-like` 클래스 추가
  - category visual을 `<img>` 대신 배경용 figure 클래스 방식으로 유지
- `blog/blog.css`
  - CAT 블록을 전면 재작성
    - wrapper: 1열 스택 레이아웃 고정
    - section: 강한 라운드 + 섹션별 gradient 배경 + 부드러운 그림자
    - intro: pill tag + 강한 타이포 + 설명
    - visual: 배경 이미지 + overlay gradient
    - card: glass 스타일(반투명, blur, hover lift)
  - 반응형
    - mobile: 1열 카드
    - tablet/pc: 2열 카드
    - pc에서도 섹션은 1줄 1카테고리

## Note

- 레퍼런스 사이트 직접 로딩은 제한되어 확인이 어려웠고,
  요청 키워드(`framer-kvc1ar`) 기준의 Framer 톤으로 구현함.
