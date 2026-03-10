# 50 - Tune Spacing And Layout UX

## Request

- 각 요소의 여백/위치를 UI/UX 좋게 수정
- 기존 3중단점 정책과 root var 중심 유지

## Applied Changes

- `blog/blog.css`
  - 홈 섹션 리듬 변수 추가 및 적용
    - `--home-block-gap`
    - `#pageHome > * + * { margin-top: var(--home-block-gap); }`
  - Latest 영역 여백/트랙 패딩 변수화
    - `--latest-edge-margin`, `--latest-track-*`
  - Quote 컨테이너 간격 변수화
    - `--quote-container-gap`
  - Category 래퍼 정렬/간격 개선
    - PC에서 `max-width: var(--max)` + 중앙 정렬 + gap 변수
  - Random(rp4) 레이아웃 개선
    - flex -> grid 전환
    - `--rp4-cols`로 모바일/태블릿/PC 열 수 제어
    - `.rp4-info`를 `grid-column: 1 / -1`로 헤더 역할 고정
  - CTA 영역 위치/패딩/타이포 개선
    - `--cta-*` 토큰 추가 후 카드 폭/패딩/폰트 적용
  - Footer 간격/아이콘 크기 토큰화
    - `--footer-*` 토큰 추가 후 패딩, gap, icon size 적용

## Validation

- 변수 선언/사용 반영 확인
- 중복 선언(`.footer-social svg`) 정리 완료

## Note

- 값 튜닝은 모바일-first이며 tablet/pc는 root media override로 관리.
