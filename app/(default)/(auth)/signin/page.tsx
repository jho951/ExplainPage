import { redirect } from 'next/navigation';

import SignInTemplate from '@/components/templates/auth/SignInTemplate';
import { AUTH_DEFAULT_NEXT_PATH, normalizeRedirectPath } from '@/constants/auth';
import { isSsoConfigured } from '@/libs/auth-client';
import { buildStartFrontendSignInUrl, isExternalStartFrontend } from '@/libs/auth-routing';

interface SignInPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextParam = resolvedSearchParams?.next;
  const nextPath = normalizeRedirectPath(Array.isArray(nextParam) ? nextParam[0] : nextParam);
  const authConfigured = isSsoConfigured();
  const resolvedNextPath = nextPath || AUTH_DEFAULT_NEXT_PATH;

  if (isExternalStartFrontend()) {
    redirect(buildStartFrontendSignInUrl(resolvedNextPath));
  }

  return (
    <SignInTemplate
      title="SB에 오신 것을 환영합니다"
      desc="GitHub callback은 ExplainPage SSO가 처리하고, 이 프론트는 ticket exchange와 /auth/me 확인만 담당합니다."
      dividerText="또는"
      authConfigured={authConfigured}
      nextPath={resolvedNextPath}
    />
  );
}

export default SignInPage;
