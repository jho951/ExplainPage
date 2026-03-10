# 51 - Random Post Box Root Category Sync

## Request

- `random-post-box.js`가 아래 4개 루트 카테고리 글만 랜덤으로 가져오도록 수정
  - ComputerScience
  - Development
  - Engineering
  - Trouble Shooting

## Applied Changes

- `blog/random-post-box.js`
  - canonical root config 추가 (`ROOT_CATEGORIES`)
  - 카드 초기화 시 `data-cat`, `data-list`, `data-rss`를 canonical 4개 루트 기준으로 강제 설정
  - 카테고리 path 인코딩 헬퍼 추가 (`encodeCategoryPath`)
    - `Trouble Shooting` 공백 경로를 안전하게 `%20` 인코딩
  - legacy alias 매핑 추가 (`getRootByAny`)
    - 기존 `CS/FE/BE/INFRA` 같은 값이 들어와도 canonical root로 해석
  - 랜덤 수집 시 canonical root 기준으로 RSS + list 경로 사용

## Validation

- `node --check blog/random-post-box.js` 통과
