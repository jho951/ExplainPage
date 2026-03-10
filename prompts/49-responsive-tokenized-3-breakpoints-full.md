# 49 - Responsive Tokenized 3 Breakpoints Full

## Request

- 반응형 중단점 3개 기준으로 CSS를 맞추고
- `:root` var를 최대한 활용해 디자인/유지보수 개선

## Breakpoint Policy

- Mobile: `< 768px`
- Tablet: `768px ~ 1024px`
- PC: `>= 1025px`

## Applied Changes

- `blog/blog.css`
  - breakpoint token 정리
    - `--bp-md: 768px`
    - `--bp-md-max: 1024px`
    - `--bp-lg: 1025px`
  - display utility 3분기 정리
    - `.mobile-only`, `.tablet-only`, `.pc-only`
  - 주요 섹션을 root token 기반으로 치환
    - Button (`--btn-*`)
    - Minimal (`--minimal-*`)
    - Category (`--category-*`)
    - Random (`--rp4-*`)
    - News (`--news-*`)
  - tablet/pc에서 값 변경은 주로 `:root` media block에서 오버라이드되도록 구성
  - 기존 `1024` PC 경계는 `1025` 기준으로 상향 반영

## Result

- 기본은 mobile-first
- tablet/pc는 token override 중심으로 반응형 일관성 확보
- 섹션별 하드코딩 px 의존도를 낮춰 이후 튜닝 비용 감소
