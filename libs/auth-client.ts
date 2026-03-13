import { SSO_EXCHANGE_PATH, SSO_LOGOUT_PATH, SSO_ME_PATH, SSO_START_PATH } from '@/constants/auth';
import { SSO_BASE_URL } from '@/constants/security';
import { buildConsumerCallbackUrl } from '@/libs/auth-routing';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: string[];
}

interface AuthMeResponse {
  user?: (Partial<AuthUser> & { avatar_url?: string }) | null;
  id?: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  avatar_url?: string;
  roles?: string[];
}

class SsoRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'SsoRequestError';
    this.status = status;
  }
}

const isSsoConfigured = () => Boolean(SSO_BASE_URL);

const getSsoStartUrl = (nextPath?: string) => {
  if (!SSO_BASE_URL) {
    throw new Error('SSO base URL is not configured.');
  }

  const url = new URL(SSO_START_PATH, SSO_BASE_URL);
  url.searchParams.set('redirect_uri', buildConsumerCallbackUrl(nextPath));
  return url.toString();
};

const parseAuthUser = (payload: AuthMeResponse): AuthUser => {
  const user = payload.user ?? payload;

  return {
    id: user.id ?? '',
    email: user.email ?? '',
    name: user.name ?? user.email ?? '',
    avatarUrl: user.avatarUrl ?? user.avatar_url ?? payload.avatarUrl ?? payload.avatar_url,
    roles: Array.isArray(user.roles) ? user.roles : [],
  };
};

const fetchSsoJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!SSO_BASE_URL) {
    throw new Error('SSO base URL is not configured.');
  }

  const response = await fetch(new URL(path, SSO_BASE_URL), {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const message = responseText || `SSO request failed: ${response.status}`;
    throw new SsoRequestError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

const exchangeAuthTicket = async (ticket: string) => {
  await fetchSsoJson<void>(SSO_EXCHANGE_PATH, {
    method: 'POST',
    body: JSON.stringify({ ticket }),
  });
};

const fetchAuthMe = async (): Promise<AuthUser> => {
  const payload = await fetchSsoJson<AuthMeResponse>(SSO_ME_PATH, {
    method: 'GET',
  });

  return parseAuthUser(payload);
};

const logoutAuthSession = async () => {
  await fetchSsoJson<void>(SSO_LOGOUT_PATH, {
    method: 'POST',
  });
};

export { exchangeAuthTicket, fetchAuthMe, getSsoStartUrl, isSsoConfigured, logoutAuthSession };
export { SsoRequestError };
export type { AuthUser };
