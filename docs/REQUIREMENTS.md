# REQUIREMENTS

## Product Scope (frontend-ui)

- Next.js 기반 웹 프론트엔드 기능을 안정적으로 제공한다.
- 기존 사용자 경험(다국어, 다크모드, 블로그/콘텐츠) 회귀를 방지한다.

## Functional Requirements

- 라우팅/화면 렌더링은 기존 동작을 유지한다.
- 접근 가능한 UI와 반응형 레이아웃을 유지한다.
- 콘텐츠 렌더링(마크다운/블로그 관련 기능)을 깨지 않도록 한다.
- 에디터(`/edit`, `/[lang]/edit`) 기능은 제공하지 않는다.
- 인증이 필요한 경로는 SSO 세션 쿠키 기반으로 보호한다.
- GitHub OAuth callback 처리는 ExplainPage SSO 서버가 담당하고, 프론트는 provider callback을 직접 처리하지 않는다.
- 프론트는 `ticket -> /auth/exchange -> /auth/me` 흐름으로 로그인 상태를 확정한다.
- 이 저장소는 로컬에서 `http://localhost:3000/signin` 에서 로그인 시작을 담당하고, SSO 서버 callback 처리 후 소비 프론트 `http://localhost:5173/auth/callback` 으로 복귀시킨다.
- 소비 프론트 callback 단계에서 `ticket` 누락, `/auth/exchange` 실패, `/auth/me` 실패가 발생하면 시작 프론트 `http://localhost:3000/signin` 으로 복귀시켜 재로그인을 유도한다.

## Non-Functional Requirements

- 타입 안정성: TypeScript 오류 없이 빌드 가능해야 한다.
- 코드 품질: ESLint/Prettier 규칙을 준수한다.
- 성능: 불필요한 번들 증가/렌더링 비용 증가를 피한다.
- 클라이언트 전역 상태는 Redux Toolkit 기반으로 일관되게 관리한다.

## Assumptions

- 이 저장소는 프론트엔드 애플리케이션(Next.js)이다.
- CI/배포 파이프라인은 기존 구성을 그대로 사용한다.
- SSO 서버 URL(`NEXT_PUBLIC_SSO_BASE_URL`)과 세션 쿠키 이름(`SSO_SESSION_COOKIE_NAME`)이 배포 환경에 설정된다.

## Change Control

- 요구사항/가정 변경 시 이 문서를 같은 PR에서 갱신한다.
- 큰 기술 결정은 ADR(`docs/decisions/`)로 기록한다.
