# Prompt Log

- Date: 2026-03-12
- Request: `docs/sso_session_plan.md` 방향으로 프론트 인증 구조를 실제 구현
- Changes made:
  - Removed direct `NextAuth + GitHub OAuth` login flow
  - Added SSO auth client helpers for start, exchange, me, logout
  - Added Redux `auth` slice and global auth bootstrap
  - Added `/auth/callback` route for one-time ticket exchange
  - Added client-side `AuthGate` for protected `/app` routes
  - Updated header auth actions to use SSO session state and logout
  - Switched middleware auth check from `next-auth` JWT to SSO session cookie presence
  - Updated `docs/REQUIREMENTS.md` and added ADR `docs/decisions/003-use-sso-session-cookie-auth.md`
- Verification:
  - `npm run _typecheck`
  - `npm run _lint`
