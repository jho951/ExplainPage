# 45 - Keep Only CS and Development Cat Sections

## Request

- cat 영역을 아래 2개 구조로만 유지
  - ComputerScience: DataStructure, ComputerArchitecture, Algorithm, Network, OS
  - Development: Language, Framework, Infra, DataBase, Tool

## Applied Changes

- `blog/blog.html`
  - `FE` 섹션(`data-root-cat="FE"`) 전체 제거
  - cat 영역에 `ComputerScience`, `Development` 섹션만 유지

## Validation

- `category-grid-section`가 2개만 남았는지 확인
