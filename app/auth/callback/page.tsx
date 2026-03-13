'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@jho951/ui-components';

import { AUTH_DEFAULT_NEXT_PATH, normalizeRedirectPath } from '@/constants/auth';
import { buildStartFrontendSignInUrl } from '@/libs/auth-routing';
import { SsoRequestError, exchangeAuthTicket, fetchAuthMe } from '@/libs/auth-client';
import { useAppDispatch } from '@/store/hooks';
import { setAuthState } from '@/store/slices/auth-slice';

type CallbackStep = 'idle' | 'exchange' | 'me' | 'done';

function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState<CallbackStep>('idle');

  useEffect(() => {
    const ticket = searchParams.get('ticket');
    const callbackError = searchParams.get('error');
    const nextPath = normalizeRedirectPath(searchParams.get('next')) || AUTH_DEFAULT_NEXT_PATH;
    const restartUrl = buildStartFrontendSignInUrl(nextPath);

    if (callbackError) {
      setErrorMessage(`SSO callback error: ${callbackError}`);
      const timeoutId = window.setTimeout(() => {
        window.location.replace(restartUrl);
      }, 1500);
      return () => window.clearTimeout(timeoutId);
    }

    if (!ticket) {
      setErrorMessage('인증 ticket 이 없습니다. 로그인 흐름을 다시 시작해 주세요.');
      const timeoutId = window.setTimeout(() => {
        window.location.replace(restartUrl);
      }, 1500);
      return () => window.clearTimeout(timeoutId);
      return;
    }

    let cancelled = false;

    const completeSignIn = async () => {
      let currentStep: CallbackStep = 'exchange';

      try {
        setStep('exchange');
        await exchangeAuthTicket(ticket);
        currentStep = 'me';
        setStep('me');
        const user = await fetchAuthMe();

        if (!cancelled) {
          setStep('done');
          dispatch(
            setAuthState({
              user,
              status: 'authenticated',
              initialized: true,
              error: null,
            }),
          );
          router.replace(nextPath);
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof SsoRequestError
              ? `[${currentStep === 'me' ? '/auth/me' : '/auth/exchange'} ${error.status}] ${error.message}`
              : error instanceof Error
                ? error.message
                : 'Failed to exchange auth ticket.';

          dispatch(
            setAuthState({
              user: null,
              status: 'anonymous',
              initialized: true,
              error: message,
            }),
          );
          setErrorMessage(
            `로그인 세션 연결에 실패했습니다. ${message || '잠시 후 다시 시도해 주세요.'}`,
          );
          window.setTimeout(() => {
            window.location.replace(restartUrl);
          }, 1500);
        }
      }
    };

    void completeSignIn();

    return () => {
      cancelled = true;
    };
  }, [dispatch, router, searchParams]);

  return (
    <main>
      <p>
        {errorMessage ||
          (step === 'me'
            ? '사용자 세션을 확인하고 있습니다...'
            : '로그인 세션을 연결하고 있습니다...')}
      </p>
      {errorMessage ? (
        <Button
          type="button"
          variant="primary"
          onClick={() =>
            window.location.replace(
              buildStartFrontendSignInUrl(
                normalizeRedirectPath(searchParams.get('next')) || AUTH_DEFAULT_NEXT_PATH,
              ),
            )
          }
        >
          다시 로그인
        </Button>
      ) : null}
    </main>
  );
}

export default AuthCallbackPage;
