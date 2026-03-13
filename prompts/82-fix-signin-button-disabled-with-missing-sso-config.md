# Prompt Log

- Date: 2026-03-12
- Request: signin 페이지 로그인 버튼이 계속 로딩처럼 보이고 클릭되지 않는 문제 수정
- Cause:
  - `NEXT_PUBLIC_SSO_BASE_URL` 미설정 시 버튼 자체를 `disabled` 처리하고 있었음
- Fix:
  - 버튼 비활성화 조건을 `isSubmitting` 으로만 제한
  - 설정 누락 시 클릭하면 에러 메시지가 표시되도록 유지
