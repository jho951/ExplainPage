# SSO Backend API Spec

## Purpose

이 문서는 프론트엔드가 기대하는 ExplainPage SSO 백엔드 API 계약을 정의한다.

대상 서버:

- ExplainPage 인증 서버
- GitHub OAuth를 실제로 처리하는 Spring Boot SSO 서버

핵심 원칙:

- GitHub OAuth callback 은 프론트가 아니라 SSO 서버가 처리한다.
- 프론트는 GitHub access token 을 직접 저장하거나 사용하지 않는다.
- 보호 경로의 최종 인증 판정은 항상 `GET /auth/me` 결과를 기준으로 한다.
- 모든 인증 요청은 `credentials: "include"` 기준으로 동작한다.

## Required Flow

1. 프론트가 `GET /auth/sso/start?redirect_uri=...` 로 이동
2. SSO 서버가 GitHub 로그인으로 리다이렉트
3. GitHub OAuth callback 은 SSO 서버가 처리
4. SSO 서버가 사용자 검증 후 1회용 `ticket` 발급
5. SSO 서버가 프론트의 `redirect_uri` 로 이동
6. 프론트가 `POST /auth/exchange` 로 `ticket` 교환
7. SSO 서버가 세션 쿠키 발급
8. 프론트가 `GET /auth/me` 호출
9. `200 OK` 이면 로그인 상태, `401 Unauthorized` 이면 비로그인 상태

## Endpoint Summary

| Method | Path                    | Purpose                       |
| ------ | ----------------------- | ----------------------------- |
| `GET`  | `/auth/sso/start`       | GitHub 로그인 시작            |
| `GET`  | `/auth/github/callback` | GitHub callback 처리          |
| `POST` | `/auth/exchange`        | 1회용 ticket 을 세션으로 교환 |
| `GET`  | `/auth/me`              | 현재 로그인 사용자 조회       |
| `POST` | `/auth/logout`          | 세션 종료                     |

## 1. Start Login

### Request

`GET /auth/sso/start?redirect_uri={encoded_callback_url}`

예시:

```http
GET /auth/sso/start?redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback%3Fnext%3D%252F
```

### Query Parameters

| Name           | Required | Description                      |
| -------------- | -------- | -------------------------------- |
| `redirect_uri` | Yes      | 인증 완료 후 프론트가 복귀할 URL |

### Server Behavior

- GitHub OAuth 인증을 시작한다.
- `redirect_uri` 는 서버 allowlist 에 등록된 값만 허용한다.
- 허용되지 않은 `redirect_uri` 는 거부한다.

### Error Response

- `400 Bad Request`: `redirect_uri` 누락 또는 형식 오류
- `403 Forbidden`: 허용되지 않은 `redirect_uri`

## 2. GitHub Callback

### Request

`GET /auth/github/callback`

이 엔드포인트는 GitHub OAuth provider callback 용이다.

### Server Behavior

- GitHub authorization code 를 검증한다.
- GitHub 사용자 정보를 조회한다.
- 내부 사용자 식별 및 권한 매핑을 수행한다.
- 프론트에 GitHub access token 을 전달하지 않는다.
- 짧은 TTL의 1회용 `ticket` 을 생성한다.
- 최종적으로 프론트 callback URL 로 리다이렉트한다.

### Redirect Result

성공 예시:

```text
http://localhost:5173/auth/callback?ticket=one_time_ticket&next=%2F
```

실패 예시:

```text
http://localhost:5173/auth/callback?error=oauth_failed&next=%2F
```

### Notes

- GitHub callback 처리는 반드시 SSO 서버가 담당한다.
- 프론트는 GitHub provider callback 을 직접 처리하지 않는다.

## 3. Exchange Ticket

### Request

`POST /auth/exchange`

Headers:

```http
Content-Type: application/json
```

Body:

```json
{
  "ticket": "one-time-ticket"
}
```

### Server Behavior

- `ticket` 유효성을 검증한다.
- `ticket` 은 1회만 사용 가능해야 한다.
- `ticket` TTL 은 짧게 유지한다.
- 검증 성공 시 로그인 세션을 생성한다.
- `Set-Cookie` 헤더로 세션 쿠키를 내려준다.

### Success Response

- `200 OK` 또는 `204 No Content`

예시:

```http
Set-Cookie: sso_session=...; HttpOnly; Path=/; SameSite=None; Secure
```

### Error Response

- `400 Bad Request`: body 형식 오류
- `401 Unauthorized`: 만료되었거나 유효하지 않은 ticket
- `409 Conflict`: 이미 사용된 ticket

## 4. Get Current User

### Request

`GET /auth/me`

프론트는 이 응답을 기준으로 인증 상태를 최종 판정한다.

### Success Response

- `200 OK`

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John",
  "avatarUrl": "https://...",
  "roles": ["user"]
}
```

### Response Fields

| Field       | Type       | Required | Description        |
| ----------- | ---------- | -------- | ------------------ |
| `id`        | `string`   | Yes      | 내부 사용자 식별자 |
| `email`     | `string`   | Yes      | 사용자 이메일      |
| `name`      | `string`   | Yes      | 사용자 표시 이름   |
| `avatarUrl` | `string`   | No       | 프로필 이미지 URL  |
| `roles`     | `string[]` | Yes      | 권한 목록          |

### Unauthenticated Response

- `401 Unauthorized`

### Rules

- 보호 경로의 최종 인증 판정은 항상 `/auth/me` 로 수행한다.
- 단순 쿠키 존재만으로 로그인 성공으로 간주하지 않는다.

## 5. Logout

### Request

`POST /auth/logout`

### Server Behavior

- 현재 세션을 무효화한다.
- 세션 쿠키를 삭제하거나 만료 처리한다.

### Success Response

- `200 OK` 또는 `204 No Content`

### Unauthenticated Response

- `200 OK` 또는 `204 No Content`

## Cookie Requirements

세션 쿠키는 아래 조건을 만족해야 한다.

- `HttpOnly`
- `Path=/`
- 프론트와 서버가 cross-origin 이면 적절한 `SameSite` 설정 필요
- HTTPS 환경에서는 `Secure` 적용
- 로컬 개발과 운영 환경의 도메인 정책을 구분해 관리

예시:

```http
Set-Cookie: sso_session=...; HttpOnly; Path=/; SameSite=None; Secure
```

## CORS Requirements

프론트는 `fetch(..., { credentials: 'include' })` 로 호출한다.

따라서 서버는 다음을 만족해야 한다.

- `Access-Control-Allow-Credentials: true`
- 프론트 origin 을 명시적으로 허용
- `*` 와 credentials 조합 사용 금지
- 백엔드 CORS 허용 origin 과 실제 프론트 origin 은 반드시 일치해야 한다.

로컬 개발 예시 허용 origin:

- `http://localhost:5173`

## Backend Environment Variables

백엔드 `.env` 또는 application config 에 아래 값이 실제 프론트 주소로 설정되어야 한다.

| Name                        | Example                               | Purpose                                 |
| --------------------------- | ------------------------------------- | --------------------------------------- |
| `SSO_FRONTEND_ORIGIN`       | `http://localhost:5173`               | CORS 허용 origin                        |
| `SSO_FRONTEND_CALLBACK_URI` | `http://localhost:5173/auth/callback` | 인증 완료 후 복귀할 프론트 callback URL |

로컬 개발 예시:

```env
SSO_FRONTEND_ORIGIN=http://localhost:5173
SSO_FRONTEND_CALLBACK_URI=http://localhost:5173/auth/callback
```

## Redirect Allowlist

서버는 아래 callback URL 을 allowlist 로 관리해야 한다.

로컬 개발 기준:

- `http://localhost:5173/auth/callback`

운영/스테이징 URL 도 별도로 등록해야 한다.

## GitHub OAuth App Configuration

GitHub OAuth 앱의 callback URL 은 프론트 callback 이 아니라 서버 callback 으로 설정해야 한다.

예시:

```text
http://localhost:8080/auth/github/callback
```

즉 흐름은 다음과 같다.

1. 프론트는 SSO 서버의 `/auth/sso/start` 로 이동
2. GitHub 는 SSO 서버의 `/auth/github/callback` 으로 복귀
3. SSO 서버가 처리 후 프론트의 `/auth/callback` 으로 다시 리다이렉트

## Security Requirements

- GitHub access token 과 refresh token 은 서버 내부에서만 사용한다.
- 프론트로 GitHub provider token 을 전달하지 않는다.
- `ticket` 은 1회용이어야 한다.
- `ticket` 은 짧은 TTL 을 가져야 한다.
- 만료되거나 재사용된 `ticket` 은 실패 처리해야 한다.
- `/auth/me` 는 세션의 유효성을 서버 기준으로 검증해야 한다.

## Frontend Expectations

프론트는 아래 계약을 전제로 구현되어 있다.

- 로그인 시작 URL: `GET /auth/sso/start?redirect_uri=...`
- callback 이후: `POST /auth/exchange`
- 최종 인증 확인: `GET /auth/me`
- 로그아웃: `POST /auth/logout`
- 모든 인증 요청은 `credentials: "include"`
- GitHub callback 처리 주체: SSO 서버
- 보호 경로 최종 판정 주체: `/auth/me`

## Local Development Reference

현재 로컬 개발 기준 프론트 callback URL:

- `http://localhost:5173/auth/callback`

예시 전체 흐름:

1. 프론트가 SSO 시작 URL 로 이동
2. SSO 서버가 GitHub 로그인 수행
3. SSO 서버가 `http://localhost:5173/auth/callback?ticket=...&next=%2Fapp` 로 리다이렉트
4. 프론트가 `POST /auth/exchange`
5. 프론트가 `GET /auth/me`
6. `/auth/me` 가 `200`이면 `/app` 접근 허용

## Open Decisions

서버팀과 최종 합의가 필요한 항목:

- 세션 쿠키 이름
- 세션 만료 시간
- `SameSite` 정책
- `Secure` 적용 기준
- 운영 도메인 기준 `Domain` 설정
- `/auth/me` 응답 스키마의 확장 필드
- 에러 코드 표준
