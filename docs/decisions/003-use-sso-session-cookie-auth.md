# ADR-003: Use SSO Session Cookie Auth for Frontend Login

## Status

Accepted

## Date

2026-03-12

## Context

기존 프론트는 `NextAuth`를 통해 GitHub OAuth를 직접 처리하고 있었다. 하지만 서비스 목표는 프론트가 외부 OAuth provider 토큰을 직접 다루지 않고, 별도의 SSO 서버가 검증한 인증 상태만 소비하는 구조다.

이 요구사항에서는 다음이 중요하다.

- GitHub access token을 브라우저 JavaScript에 노출하지 않는다.
- 서비스 간 SSO 확장을 고려한다.
- 프론트 인증 로직을 단순화하고 보호 경로 판단 기준을 일관되게 만든다.

## Decision

프론트 로그인 구조를 `SSO 세션 서버 + HttpOnly 쿠키 세션` 방식으로 전환한다.

- 로그인 버튼은 SSO 서버의 `/auth/sso/start`로 이동한다.
- GitHub OAuth callback 은 프론트가 아니라 ExplainPage SSO 서버가 처리한다.
- SSO 서버 callback 이후 프론트의 `/auth/callback`에서 `ticket`을 `/auth/exchange`로 교환한다.
- 앱 초기화 시 `/auth/me`를 호출해 인증 상태를 bootstrap 한다.
- 보호 경로의 최종 판정은 항상 `/auth/me` 결과로 처리한다.
- 로그아웃은 `/auth/logout` 호출 후 로컬 auth 상태를 비운다.

## Consequences

- 프론트에서 GitHub access token, refresh token 저장 로직이 사라진다.
- 인증 관련 전역 상태는 Redux `auth` slice에 모은다.
- 서버와 `redirect_uri`, `/auth/me` 응답 스키마, 쿠키 도메인/SameSite 정책을 사전에 합의해야 한다.
- 기존 `NextAuth` 직접 로그인 코드는 제거 대상이 된다.
