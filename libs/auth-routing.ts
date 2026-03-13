import {
  AUTH_CALLBACK_PATH,
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_SIGN_IN_PATH,
  normalizeRedirectPath,
} from '@/constants/auth';
import {
  PROJECT_URL,
  SSO_CONSUMER_CALLBACK_URL,
  SSO_START_FRONTEND_URL,
} from '@/constants/security';

const buildConsumerCallbackUrl = (nextPath?: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const callbackBaseUrl =
    SSO_CONSUMER_CALLBACK_URL || new URL(AUTH_CALLBACK_PATH, PROJECT_URL).toString();
  const callbackUrl = new URL(callbackBaseUrl);
  callbackUrl.searchParams.set('next', normalizedNextPath);
  return callbackUrl.toString();
};

const buildStartFrontendSignInUrl = (nextPath?: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const signInBaseUrl = SSO_START_FRONTEND_URL || PROJECT_URL;
  const signInUrl = new URL(AUTH_SIGN_IN_PATH, signInBaseUrl);
  signInUrl.searchParams.set('next', normalizedNextPath);
  return signInUrl.toString();
};

const isExternalStartFrontend = () =>
  Boolean(SSO_START_FRONTEND_URL) && SSO_START_FRONTEND_URL !== PROJECT_URL;

export { buildConsumerCallbackUrl, buildStartFrontendSignInUrl, isExternalStartFrontend };
