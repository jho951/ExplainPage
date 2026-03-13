# Prompt Log

- Date: 2026-03-12
- Request: `docs/sso_session_plan.md` 기준으로 현재 프론트에서 SSO 로그인/세션을 어떻게 구현해야 하는지 정리
- Context reviewed:
  - `docs/sso_session_plan.md`
  - `docs/REQUIREMENTS.md`
  - `libs/auth.ts`
  - `app/api/auth/[...nextauth]/route.ts`
  - `app/(default)/(auth)/signin/page.tsx`
  - `components/templates/auth/SignInTemplate.tsx`
  - `middleware.ts`
- Output summary:
  - 현재 구현은 NextAuth GitHub 직접 로그인 구조임
  - 목표 구조는 SSO 세션 서버 + HttpOnly 쿠키 기반 인증으로 재편 필요
  - 프론트는 로그인 시작, callback 처리, `/auth/me` bootstrap, 보호 라우트 체크, logout, 401 처리 중심으로 구성 권장
  - 요구사항 문서의 인증 관련 항목은 구현 전/동시에 갱신 필요
