User request:

- 깃 허브 소셜 로그인 구현해줘

Work performed:

- Kept the existing NextAuth GitHub provider flow and completed the missing integration points.
- Updated `middleware.ts` to validate protected routes with the NextAuth JWT cookie instead of the legacy `auth_token` cookie.
- Added sign-in page guards so authenticated users are redirected away from `/signin`.
- Added a configuration-aware sign-in UI state when GitHub auth env vars are missing.
- Updated requirements and README auth setup notes.

Notes:

- Existing rate limiting in `app/api/auth/[...nextauth]/route.ts` was preserved.
- Required env vars: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET`.
