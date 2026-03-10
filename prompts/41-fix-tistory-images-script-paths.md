# 41 - Fix Tistory Images Script Paths

## Request

- 티스토리에 올렸을 때 함수가 전부 동작하지 않는 문제 수정

## Root Cause

- `blog.html`의 스크립트 경로가 로컬 기준(`./*.js`)으로 되어 있어,
  티스토리 스킨 업로드 환경(`./images/*.js`)에서 404 발생 가능성이 높음.

## Applied Changes

- `blog/blog.html`
  - 아래 스크립트 경로를 모두 `./images/*.js`로 변경
    - util.js
    - traffic-guard.js
    - ui-features.js
    - content-effects.js
    - ui-list-toggle.js
    - guestbookStickAnim.js
    - random-post-box.js

## Validation

- `blog.html` 내 스크립트 경로가 `./images/*.js`로 반영됨을 확인.

## Note

- 티스토리 스킨 업로드 시 위 JS 파일들이 실제로 `스킨 편집 > 파일 업로드`에 포함되어야 함.
