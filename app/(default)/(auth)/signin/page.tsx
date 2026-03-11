import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import SignInTemplate from '@/components/templates/auth/SignInTemplate';
import { createAuthOptions } from '@/libs/auth';
import { GITHUB_CLIENT_KEY, GITHUB_SECRET_KEY, NEXTAUTH_SECRET_KEY } from '@/constants/security';

async function SignInPage() {
  const authConfigured = Boolean(GITHUB_CLIENT_KEY && GITHUB_SECRET_KEY && NEXTAUTH_SECRET_KEY);

  if (authConfigured) {
    const session = await getServerSession(createAuthOptions());

    if (session) {
      redirect('/');
    }
  }

  return (
    <SignInTemplate
      title="SB에 오신 것을 환영합니다"
      desc="GitHub 계정으로 로그인해서 프로젝트와 협업 흐름을 바로 이어갈 수 있습니다."
      dividerText="또는"
      authConfigured={authConfigured}
    />
  );
}

export default SignInPage;
