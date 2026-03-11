User request:

- Do not use CAPTCHA for GitHub social login.
- Protect social login with rate limiting instead.

Work performed:

- Added `libs/rate-limit.ts` with a simple in-memory sliding window limiter.
- Applied IP-based rate limiting to `/api/auth/signin/*` and `/api/auth/callback/*` in `app/api/auth/[...nextauth]/route.ts`.
- Configured the auth route to return HTTP 429 with `Retry-After` when the limit is exceeded.

Policy:

- Limit: 20 auth attempts per 5 minutes per IP.

Note:

- This is an application-memory limiter, which is appropriate for local/single-instance deployment.
- For multi-instance production, move the limiter to shared storage such as Redis.
