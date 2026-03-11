'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@jho951/ui-components';

import { SignInTemplateProps } from '@/components/templates/auth/auth.ts';
import styles from '@/components/templates/auth/SignIn.module.css';

function SignInTemplate({
  title,
  desc,
  dividerText = '또는',
  authConfigured = true,
}: SignInTemplateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isDisabled = isSubmitting || authConfigured === false;

  const handleGitHubLogin = async () => {
    if (authConfigured === false) {
      setErrorMessage(
        'GitHub OAuth 환경변수가 설정되지 않았습니다. GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NEXTAUTH_SECRET를 확인해 주세요.',
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await signIn('github', { callbackUrl: '/' });
    } catch {
      setIsSubmitting(false);
      setErrorMessage('GitHub 로그인 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <div className={styles.contentShell}>
          <div className={styles.authCard}>
            <div className={styles.authHead}>
              <p className={styles.authEyebrow}>ACCOUNT ACCESS</p>
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>

            <div className={styles.form}>
              <Button
                type="button"
                variant="primary"
                className={styles.githubButton}
                onClick={handleGitHubLogin}
                disabled={isDisabled}
              >
                {isSubmitting ? 'GitHub로 이동 중...' : 'GitHub로 계속하기'}
              </Button>
            </div>

            <div className={styles.divider}>
              <span>{dividerText}</span>
            </div>

            <div className={styles.metaBlock}>
              <p className={styles.metaTitle}>GitHub 계정으로만 로그인합니다</p>
              <p className={styles.metaText}>
                현재 인증은 GitHub OAuth 하나만 사용합니다. 협업 이력과 코드 저장소 맥락을 한
                흐름으로 연결하기 위한 선택입니다.
              </p>
            </div>

            {authConfigured === false ? (
              <p className={styles.setupMessage}>
                로그인 버튼을 쓰려면 서버 환경변수에 `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`,
                `NEXTAUTH_SECRET`가 필요합니다.
              </p>
            ) : null}

            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

            <p className={styles.disclaimer}>
              계속 진행하면 서비스 이용약관과 개인정보 처리방침에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignInTemplate;
