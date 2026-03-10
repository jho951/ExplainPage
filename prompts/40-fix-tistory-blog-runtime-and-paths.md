# 40 - Fix Tistory Blog Runtime and Paths

## Request

- `./blog` 디렉토리의 티스토리 스킨(HTML/CSS/JS)을 오류/충돌 없이 동작하게 정리
- 레퍼런스 톤은 craft.do 느낌 유지

## Applied Changes

- `blog/blog.html`
  - 잘못된 CDN stylesheet 링크 제거
  - JS 파일 경로를 실제 디렉토리 구조(`./*.js`)에 맞게 수정
  - `traffic-guard.js` 로드 추가
  - `random-post-box.js`에 `defer` 적용
  - 인라인 초기화에서 실효성 없는/중복 가능 호출 정리
  - backdrop 광고 슬롯 DOM(`ttBackdropAdSlotList`, `ttBackdropAdSlotArticle`) 추가
- `blog/util.js`
  - 유틸 함수(`qs`, `qsa`, `closest`, `onReady`)를 `window`에 노출해 스크립트 간 의존성 안정화
- `blog/content-effects.js`
  - util 누락 상황에서도 동작하도록 fallback helper(safeQs/safeQsa/safeClosest/safeOnReady) 추가
- `blog/style.css`
  - `blog.css`를 import하는 엔트리 파일 생성 (html의 `style.css` 참조 보장)

## Validation

- `node --check`로 `blog/*.js` 문법 검사 통과
- `blog/blog.html` 내 잘못된 `./images/*` 참조 제거 확인

## Notes

- 기존 레이아웃/비주얼 방향(craft.do 레퍼런스 계열)은 유지하고, 런타임 안정성과 경로 정합성 중심으로 수정함.
