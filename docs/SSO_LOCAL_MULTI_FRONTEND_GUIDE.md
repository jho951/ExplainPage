# SSO Local Multi-Frontend Guide

## Purpose

이 문서는 로컬 개발 환경에서 여러 프론트엔드와 하나의 SSO 서버를 함께 사용할 때의 표준 흐름을 정리한다.

대상 구성:

- 로그인 시작용 프론트: `http://localhost:3000`
- 인증 완료를 소비하는 프론트: `http://localhost:5173`
- GitHub OAuth 및 세션을 처리하는 SSO 서버: `http://localhost:8080`

이 문서는 다른 프로젝트에서도 같은 구조를 그대로 재사용할 수 있도록 역할과 URL 규칙을 고정해서 설명한다.

## System Roles

### 1. Start Frontend (`3000`)

- 사용자가 로그인 버튼을 누르는 진입점이다.
- GitHub OAuth 를 직접 처리하지 않는다.
- SSO 서버의 `/auth/sso/start` 로만 이동시킨다.

### 2. SSO Server (`8080`)

- GitHub OAuth provider 와 직접 통신한다.
- GitHub callback 을 직접 받는다.
- GitHub access token 확인, 사용자 조회, 내부 사용자 매핑을 처리한다.
- 자체 one-time `ticket` 을 발급한다.
- 최종적으로 소비 프론트 callback 으로 리다이렉트한다.

### 3. Consumer Frontend (`5173`)

- GitHub OAuth callback 을 직접 받지 않는다.
- SSO 서버가 발급한 `ticket` 만 받는다.
- `ticket -> /auth/exchange -> /auth/me` 흐름으로 세션을 확정한다.

## Fixed Rules

- GitHub OAuth App callback URL 은 반드시 SSO 서버를 가리켜야 한다.
- GitHub 는 `5173` 프론트로 직접 돌아오면 안 된다.
- `5173` 프론트는 GitHub `code` 나 access token 을 직접 처리하면 안 된다.
- `3000` 프론트는 로그인 시작만 담당한다.
- 최종 로그인 상태 판정은 항상 SSO 서버의 `/auth/me` 결과를 기준으로 한다.

## Required URLs

### GitHub OAuth App

- Callback URL: `http://localhost:8080/auth/github/callback`

### Start Frontend (`3000`)

- 로그인 시작 페이지: `http://localhost:3000/signin`

### Consumer Frontend (`5173`)

- 프론트 callback 페이지: `http://localhost:5173/auth/callback`

### SSO Server (`8080`)

- 로그인 시작: `http://localhost:8080/auth/sso/start`
- GitHub callback: `http://localhost:8080/auth/github/callback`
- ticket 교환: `http://localhost:8080/auth/exchange`
- 현재 사용자 조회: `http://localhost:8080/auth/me`
- 로그아웃: `http://localhost:8080/auth/logout`

## End-to-End Flow

1. 사용자가 `http://localhost:3000/signin` 에서 로그인 버튼을 누른다.
2. `3000` 프론트가 아래 주소로 이동시킨다.

```text
http://localhost:8080/auth/sso/start?redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback%3Fnext%3D%252F
```

3. `8080` SSO 서버가 GitHub 로그인 페이지로 리다이렉트한다.
4. 사용자가 GitHub 로그인 및 연동을 완료한다.
5. GitHub 가 `http://localhost:8080/auth/github/callback` 으로 복귀한다.
6. `8080` 서버가 `code`, `state` 를 검증하고 GitHub access token 및 사용자 정보를 확인한다.
7. `8080` 서버가 내부 사용자 확인 후 one-time `ticket` 을 발급한다.
8. `8080` 서버가 아래와 같이 `5173` 프론트 callback 으로 리다이렉트한다.

```text
http://localhost:5173/auth/callback?ticket=one_time_ticket&next=%2F
```

9. `5173` 프론트가 `POST /auth/exchange` 로 `ticket` 을 세션으로 교환한다.
10. `8080` 서버가 세션 쿠키를 발급한다.
11. `5173` 프론트가 `GET /auth/me` 로 로그인 상태를 확인한다.
12. `/auth/me` 가 성공하면 원래 페이지로 이동한다.

## What Each Project Must Do

### Start Frontend (`3000`)

- 로그인 버튼 클릭 시 SSO 시작 URL로 이동
- `redirect_uri` 에 소비 프론트 callback URL 포함
- 필요하면 `next` 값을 함께 전달

예시:

```ts
const redirectUri = 'http://localhost:5173/auth/callback?next=%2F';
window.location.assign(
  `http://localhost:8080/auth/sso/start?redirect_uri=${encodeURIComponent(redirectUri)}`,
);
```

### SSO Server (`8080`)

- `/auth/sso/start` 에서 `redirect_uri` 를 검증
- GitHub OAuth 를 시작
- `/auth/github/callback` 에서 GitHub `code` 교환
- 내부 사용자 인증/가입 처리
- one-time `ticket` 발급
- `redirect_uri` 기반으로 `5173/auth/callback?ticket=...` 리다이렉트
- `/auth/exchange` 에서 ticket 을 세션 쿠키로 교환
- `/auth/me` 에서 현재 사용자 반환

### Consumer Frontend (`5173`)

- `/auth/callback` 페이지에서 `ticket` 읽기
- `POST http://localhost:8080/auth/exchange`
- `GET http://localhost:8080/auth/me`
- 성공 시 앱 내부 경로로 이동
- 실패 시 로그인 페이지 또는 에러 화면으로 이동

## Environment Contract

### Start Frontend (`3000`)

- SSO 시작 주소를 알고 있어야 한다.
- 소비 프론트 callback 주소를 알고 있어야 한다.

### Consumer Frontend (`5173`)

- `NEXT_PUBLIC_SSO_BASE_URL=http://localhost:8080`
- `NEXT_PUBLIC_SITE=http://localhost:5173`
- `SSO_SESSION_COOKIE_NAME=sso_session`

### SSO Server (`8080`)

- `SSO_FRONTEND_CALLBACK_URI=http://localhost:5173/auth/callback`
- `redirect_uri` allowlist 에 `http://localhost:5173/auth/callback` 포함
- GitHub OAuth callback URL 을 `http://localhost:8080/auth/github/callback` 로 등록

## Important Non-Rules

아래 방식은 사용하면 안 된다.

- GitHub OAuth App callback URL 을 `http://localhost:5173/auth/callback` 으로 설정
- `5173` 프론트가 GitHub `code` 를 직접 받아 access token 으로 교환
- `3000` 프론트가 GitHub callback 을 직접 처리
- 프론트가 GitHub access token 을 저장
- 로그인 성공 여부를 단순 쿠키 존재만으로 판단

## Cookie and CORS Notes

- 프론트에서 SSO 서버 호출 시 `credentials: "include"` 를 사용해야 한다.
- SSO 서버는 실제 프론트 origin 을 CORS 허용 목록에 넣어야 한다.
- 로컬 HTTP 개발에서는 쿠키 `Secure` 설정을 환경에 맞게 분기해야 한다.
- 운영 HTTPS 환경에서는 `Secure` 적용이 필요하다.
- cross-origin 쿠키 정책은 `SameSite` 설정과 함께 검토해야 한다.

## Debug Checklist

### 1. 로그인 시작이 안 될 때

- `3000` 프론트가 실제로 `/auth/sso/start` 로 이동하는지 확인
- `redirect_uri` 가 `http://localhost:5173/auth/callback` 인지 확인

### 2. GitHub 로그인 후 멈출 때

- GitHub OAuth App callback URL 이 `http://localhost:8080/auth/github/callback` 인지 확인
- `8080` 서버 로그에서 callback 이후 `Location` 헤더를 확인
- 최종 리다이렉트가 `http://localhost:5173/auth/callback?ticket=...` 인지 확인

### 3. `5173` 에 도착했는데 로그인 완료가 안 될 때

- `/auth/callback` 에 `ticket` 이 있는지 확인
- `POST /auth/exchange` 응답 코드 확인
- `GET /auth/me` 응답 코드 확인
- 세션 쿠키가 저장됐는지 확인
- CORS 와 `credentials: "include"` 설정 확인

## Summary

이 구조의 핵심은 아래 한 줄이다.

- `3000` 은 로그인 시작만 한다.
- `8080` 은 GitHub OAuth 와 ticket 발급을 처리한다.
- `5173` 은 ticket 을 받아 세션을 완성한다.

즉 리다이렉트 흐름은 항상 다음과 같아야 한다.

```text
3000 -> 8080/auth/sso/start -> GitHub -> 8080/auth/github/callback -> 5173/auth/callback
```
