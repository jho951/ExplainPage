# ADR-004: Use NextAuth GitHub Login in the Frontend

## Status

Superseded by ADR-003

## Date

2026-03-12

## Context

이 ADR은 한 시점에 프론트 자체 `NextAuth + GitHub OAuth`로 로그인 기준을 정리하기 위해 작성됐다.

이후 최종 인증 요구사항이 `ExplainPage` 진입, callback `ticket`, `POST /auth/exchange`, `GET /auth/me` 기반 SSO 세션 구조로 다시 확정됐다.

## Decision

현재 기준 결정은 ADR-003을 따른다.

- 로그인 시작은 SSO 서버의 `/auth/sso/start`로 위임한다.
- callback 에서 `ticket`을 `/auth/exchange`로 교환한다.
- 인증 상태는 `/auth/me` 결과로 bootstrap 한다.
- 보호 경로는 SSO 세션 쿠키 존재 여부와 `/auth/me` 결과로 처리한다.

## Consequences

- `NextAuth` 직접 로그인 기준은 더 이상 현재 구현의 정본이 아니다.
- 관련 문서와 구현은 ADR-003, `docs/SSO_SESSION_PLAN.md`, `docs/SSO_SESSION_FRONTEND_IMPLEMENTATION.md` 기준으로 유지한다.
