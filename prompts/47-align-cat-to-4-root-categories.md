# 47 - Align Cat To 4 Root Categories

## Request

- 실제 루트 카테고리 4개 구조 반영
  - ComputerScience
  - Development
  - Engineering
  - Trouble Shooting
- 하위
  - ComputerScience: DataStructure, Algorithm, Network, OS, ComputerArchitecture
  - Development: Language, Framework, Infra, DataBase, Tool
  - Engineering: DesignPattern, Test
  - Trouble Shooting: Performance

## Applied Changes

- `blog/blog.html`
  - 기존 FE 섹션을 Engineering 섹션으로 교체 (`data-root-cat="Engineering"`)
  - Trouble Shooting 섹션 추가 (`data-root-cat="Trouble Shooting"`)
  - 각 섹션 fallback 카드도 요청 구조에 맞게 수정

## Note

- `ui-features.js`의 동기화 로직이 GNB 실데이터를 읽어 최종 카드 링크/텍스트를 덮어쓰므로,
  HTML fallback과 실제 표시가 동일한 구조로 유지됨.
