기술 블로그
다국어 번역
마크댜운 에디터
다크 모드
rss 피드 적용

## AI Agent Collaboration Artifacts

- Working agreement: `AGENTS.md`
- Requirements & assumptions: `docs/REQUIREMENTS.md`
- Decisions (ADR): `docs/decisions/`
- Prompt logs: `prompts/`
- Runbook: `docs/runbook/DEBUG.md`

## Auth Setup

- GitHub callback is handled by ExplainPage SSO.
- This frontend uses `ticket -> /auth/exchange -> /auth/me`.
- All auth requests use `credentials: "include"`.
- Required server env vars:
  - `NEXT_PUBLIC_SSO_BASE_URL`
  - `SSO_SESSION_COOKIE_NAME`
