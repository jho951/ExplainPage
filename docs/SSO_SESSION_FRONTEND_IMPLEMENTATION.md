# SSO Session Frontend Implementation

## Overview

이 프론트는 외부 OAuth provider 토큰을 직접 저장하지 않는다. 인증은 `SSO 세션 서버 + HttpOnly 쿠키 세션` 기준으로 동작한다.

현재 구현 목표:

- 로그인 시작은 프론트가 아니라 SSO 서버로 위임
- callback 이후 `ticket -> session exchange` 처리
- 앱 시작 시 `/auth/me`로 로그인 상태 bootstrap
- GitHub callback 은 ExplainPage SSO 서버가 처리
- 보호 경로의 최종 판정은 `/auth/me` 기준으로 제어
- 로그아웃은 `/auth/logout` 호출 후 로컬 auth state 초기화

## Current Flow

1. 사용자가 `/signin` 진입
2. 로그인 버튼 클릭
3. 프론트가 `GET {SSO_BASE_URL}/auth/sso/start?redirect_uri=...` 로 이동
4. ExplainPage SSO 서버가 GitHub callback 처리를 끝낸 뒤 `/auth/callback?ticket=...&next=...` 로 복귀
5. 프론트가 `POST {SSO_BASE_URL}/auth/exchange` 로 `ticket` 교환
6. SSO 서버가 세션 쿠키 발급
7. 프론트가 `GET {SSO_BASE_URL}/auth/me` 호출
8. 사용자 정보를 Redux `auth` slice에 저장
9. 이후 보호 경로 `/app/**` 는 인증 상태 기준으로 접근

## Implemented Files

- `libs/auth-client.ts`
  - SSO start URL 생성
  - `/auth/exchange`, `/auth/me`, `/auth/logout` 호출
  - 모든 인증 요청을 `credentials: 'include'` 로 전송
- `store/slices/auth-slice.ts`
  - `bootstrapAuth`
  - `exchangeAuthTicket`
  - `logoutAuth`
  - `user`, `status`, `initialized`, `error` 상태 관리
- `components/auth/AuthBootstrap.tsx`
  - 앱 시작 시 `/auth/me` bootstrap
- `components/auth/AuthGate.tsx`
  - `/app/**` 접근 시 비로그인 사용자를 `/signin` 으로 리다이렉트
- `app/(default)/(auth)/signin/page.tsx`
  - `next` 파라미터를 포함한 SSO 시작 URL 생성
- `app/auth/callback/page.tsx`
  - `ticket` 교환 후 원래 경로로 복귀
- `middleware.ts`
  - `SSO_SESSION_COOKIE_NAME` 쿠키 존재 여부로 1차 보호 처리
- `components/organisms/Header/Header.tsx`
  - 로그인/로그아웃/UI 액션을 auth state 기준으로 전환

## Environment Variables

필수:

- `NEXT_PUBLIC_SSO_BASE_URL`
  - SSO 서버 base URL
- `SSO_SESSION_COOKIE_NAME`
  - 프론트 미들웨어가 확인할 세션 쿠키 이름
- `.env.example`
  - 로컬 개발 시 필요한 기본 env 템플릿 제공

참고:

- `NEXT_PUBLIC_SITE`
  - callback URL 생성 시 사용

백엔드 설정 전제:

- 백엔드 CORS 허용 origin 과 실제 프론트 origin 이 일치해야 한다.
- 백엔드 env 의 `SSO_FRONTEND_ORIGIN` 은 실제 프론트 주소여야 한다.
- 백엔드 env 의 `SSO_FRONTEND_CALLBACK_URI` 는 실제 프론트 callback 주소여야 한다.
- GitHub OAuth 앱 callback URL 은 프론트가 아니라 SSO 서버 callback 이어야 한다.

## Required SSO Server Endpoints

프론트 구현은 아래 엔드포인트를 전제로 한다.

- `GET /auth/sso/start?redirect_uri=...`
- `POST /auth/exchange`
- `GET /auth/me`
- `POST /auth/logout`

권장 응답 예시:

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John",
  "avatarUrl": "https://...",
  "roles": ["user"]
}
```

## Frontend Behavior Rules

- GitHub access token, refresh token은 프론트에 저장하지 않는다.
- `localStorage` 에 장기 인증 토큰을 저장하지 않는다.
- 인증 상태 확인은 `GET /auth/me` 결과를 기준으로 한다.
- GitHub OAuth provider callback 은 프론트가 아니라 ExplainPage SSO 서버가 처리한다.
- 모든 인증 요청은 `credentials: 'include'` 로 보낸다.
- 로그아웃은 `POST /auth/logout` 성공 후 로컬 상태를 비운다.
- 보호 페이지는 `/app` 및 `/app/**` 기준으로 처리한다.

## Middleware Policy

`middleware.ts` 는 보호 경로 요청마다 SSO 서버의 `/auth/me`를 호출해 인증 상태를 확인한다.

이유:

- 보호 경로의 최종 판정 기준을 서버와 클라이언트 모두 `/auth/me`로 일치시킨다.
- 단순 쿠키 존재만으로 인증 성공으로 간주하지 않는다.

즉:

- `/auth/me` 성공: 페이지 진입 허용
- `/auth/me` 실패: `/signin?next=...` 로 리다이렉트

## Sign-In and Callback Rules

- `/signin`
  - `next` 쿼리를 받아 원래 이동하려던 경로를 유지한다.
  - SSO 시작 URL에 `redirect_uri` 로 전달한다.
- `/auth/callback`
  - `ticket` 이 없으면 오류 표시
  - `error` 가 있으면 오류 표시
  - 성공 시 `exchange -> /auth/me -> next redirect`

## Header Behavior

헤더 액션은 auth state에 따라 달라진다.

- 비로그인
  - `Login` -> `/signin`
  - `Get Started` -> `/signin?next=/app`
- 로그인
  - `Logout` -> `/auth/logout` 호출 후 홈 이동
  - `Open App` -> `/app`

## Operational Notes

서버와 반드시 합의해야 할 항목:

- SSO 서버 도메인
- 백엔드 CORS 허용 origin 과 프론트 origin 일치 여부
- 백엔드 `SSO_FRONTEND_ORIGIN`
- 백엔드 `SSO_FRONTEND_CALLBACK_URI`
- 세션 쿠키 도메인 범위
- `SameSite` 정책
- `Secure` 적용 여부
- `redirect_uri` 허용 목록
- GitHub OAuth 앱 callback URL
- `/auth/me` 응답 스키마
- ticket TTL 과 1회용 정책

## Verification

구현 후 확인한 항목:

- `npm run _typecheck`
- `npm run _lint`

## Related Documents

- `docs/SSO_SESSION_PLAN.md`
- `docs/REQUIREMENTS.md`
- `docs/decisions/003-use-sso-session-cookie-auth.md`
