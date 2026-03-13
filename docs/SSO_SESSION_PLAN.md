# SSO Session Integration Plan

## Goal

`ExplainPage`에서 GitHub 로그인이 완료되면, 이 프로젝트(`webdrowing`)는 GitHub 토큰을 직접 다루지 않고 SSO 세션 서버가 발급한 인증 상태만 사용한다.

핵심 목표:

- 프론트에서 GitHub access token을 직접 보관하지 않는다.
- 서버가 사용자 검증 후 자체 세션 또는 짧은 수명의 토큰을 발급한다.
- `webdrowing`는 서버 구축 후 인증 엔드포인트만 연결하면 동작할 수 있게 만든다.

## Recommended Architecture

권장 방식은 `SSO 세션 서버 + HttpOnly 쿠키` 구조다.

흐름:

1. 사용자가 `ExplainPage`에서 로그인 시작
2. GitHub OAuth 인증 완료
3. `ExplainPage` 백엔드가 GitHub access token으로 사용자 검증
4. 백엔드는 GitHub 토큰을 프론트에 주지 않고 자체 세션 또는 1회용 ticket 생성
5. `webdrowing`는 그 ticket을 교환하거나 이미 설정된 세션 쿠키를 사용
6. 이후 API 호출은 세션 기반으로 인증

## Why Cookie Session Is Better

현재 프로젝트의 [client.ts](/Users/jhons/Downloads/FE/webdrowing/src/shared/api/client.ts)는 이미 `withCredentials: true`가 설정되어 있다.

이 구조에서는 `HttpOnly Secure SameSite` 쿠키를 쓰는 것이 가장 안전하다.

장점:

- GitHub 토큰이 브라우저 JS에 노출되지 않음
- XSS 시 토큰 탈취 위험이 줄어듦
- 프론트가 토큰 저장/갱신 로직을 덜 가짐
- 여러 서비스 간 SSO 확장이 쉬움

## Alternative

차선책으로는 짧은 수명의 access token + refresh/session endpoint 방식이 있다.

하지만 이 경우에도 GitHub 토큰은 프론트에 직접 전달하지 말고, SSO 서버가 자체 access token만 발급해야 한다.

## Suggested Endpoints

SSO 서버 또는 인증 서버에서 아래 엔드포인트를 제공하는 것을 권장한다.

- `GET /auth/sso/start?redirect_uri=...`
- `GET /auth/github/callback`
- `POST /auth/exchange`
- `GET /auth/me`
- `POST /auth/refresh`
- `POST /auth/logout`

## Recommended Login Flow

가장 추천하는 흐름은 아래와 같다.

1. `ExplainPage` 로그인 성공
2. 인증 서버가 `one-time ticket` 발급
3. `webdrowing` 진입 시 `POST /auth/exchange` 호출
4. 서버가 세션 쿠키 발급
5. 이후 `/api/**` 호출은 쿠키 기반 인증
6. 프론트는 `GET /auth/me`로 로그인 상태 확인

## Token Policy

권장 정책:

- GitHub access token: 서버 내부에서만 사용
- 브라우저: GitHub 토큰 저장 금지
- 프론트에 토큰이 꼭 필요하면 SSO 서버의 짧은 수명 access token만 허용
- 가장 좋은 방식은 access token도 JS 저장 없이 쿠키 세션만 사용하는 것

## Current Project Readiness

현재 프로젝트는 일부 준비가 되어 있다.

- [client.ts](/Users/jhons/Downloads/FE/webdrowing/src/shared/api/client.ts)
  - Axios 기반 공통 API 클라이언트
  - `withCredentials: true` 설정됨
  - Authorization 헤더 주입 가능
- [token.ts](/Users/jhons/Downloads/FE/webdrowing/src/shared/api/token.ts)
  - 필요 시 외부 토큰 provider 주입 가능

즉 서버 구축 후 아래 둘 중 하나로 연결 가능하다.

### 1. Cookie Session 방식

이 경우:

- `getAuthToken()` 없이 사용 가능
- 쿠키 기반으로 인증
- 프론트는 `/auth/me`만 확인하면 됨

### 2. Bearer Token 방식

이 경우:

- 로그인 성공 후 access token을 메모리 또는 store에 저장
- `attachAuthTokenProvider(() => accessToken)` 연결
- 만료/재발급 정책을 별도로 구현

## Recommended Choice

이 프로젝트에는 `Cookie Session 방식`을 권장한다.

이유:

- 현재 Axios 설정과 잘 맞음
- 프론트 구현이 단순해짐
- SSO 구조와 보안 측면에서 더 적절함

## Required Server Decisions

서버 구축 전에 아래 항목을 먼저 확정해야 한다.

- 인증 서버 도메인
- 쿠키 도메인 범위
- `SameSite` 정책
- `Secure` 적용 여부
- 세션 만료 시간
- `GET /auth/me` 응답 스키마
- `401` 발생 시 refresh 또는 재로그인 정책
- 서비스 간 redirect/callback 허용 목록

## Suggested `/auth/me` Response

예시:

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John",
  "avatarUrl": "https://...",
  "roles": ["user"]
}
```

## Frontend Work To Add Later

서버 준비 후 이 프로젝트에 추가할 프론트 인증 골격:

- `auth API`
- `auth slice` 또는 `auth store`
- `useAuth`
- `AuthGate`
- `/auth/callback` route
- `GET /auth/me` bootstrap
- `401` interceptor 처리

## Implementation Notes

권장 동작 방식:

- 앱 시작 시 `GET /auth/me` 호출
- 성공 시 사용자 상태 저장
- 실패 시 비로그인 상태로 처리
- 보호된 페이지는 `AuthGate`로 감싸기
- 로그아웃 시 `POST /auth/logout` 호출 후 로컬 상태 초기화

## Security Notes

- localStorage에 장기 토큰 저장은 피한다
- refresh token을 JS에서 직접 다루지 않는다
- 가능하면 `HttpOnly` 쿠키만 사용한다
- CORS와 쿠키 정책을 서비스 도메인 기준으로 명확히 설정한다
- `POST /auth/exchange` ticket는 1회용 + 짧은 TTL로 제한한다

## Summary

정리하면:

- `ExplainPage`는 GitHub 로그인 진입점 역할
- SSO 서버는 GitHub 사용자 검증과 세션 발급 담당
- `webdrowing`는 GitHub 토큰 대신 세션만 사용
- 구현 방식은 `one-time ticket -> session exchange -> /auth/me 확인` 흐름이 가장 적절함
