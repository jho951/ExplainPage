# Prompt Log 7: Normalize Component Directory Naming

## Goal

`components` 하위 디렉터리 네이밍을 일관된 `kebab-case`로 통일한다.

## Scope

- `atoms/Image` -> `atoms/image`
- `atoms/Link` -> `atoms/link`
- `molecules/Fnb` -> `molecules/fnb`
- `molecules/FooterMeta` -> `molecules/footer-meta`
- `molecules/Logo` -> `molecules/logo`
- `organisms/Footer` -> `organisms/footer`
- `organisms/Header` -> `organisms/header`
- 관련 import 경로 전체 치환

## Verification

- `npm run _typecheck` 통과
- 변경 대상 eslint 통과
