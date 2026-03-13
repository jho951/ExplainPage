const AUTH_SIGN_IN_PATH = '/signin';
const AUTH_CALLBACK_PATH = '/auth/callback';
const AUTH_DEFAULT_NEXT_PATH = '/app';
const SSO_START_PATH = '/auth/sso/start';
const SSO_EXCHANGE_PATH = '/auth/exchange';
const SSO_ME_PATH = '/auth/me';
const SSO_LOGOUT_PATH = '/auth/logout';

const normalizeRedirectPath = (value?: string | null) => {
  if (!value) {
    return '/';
  }

  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  if (!decoded.startsWith('/') || decoded.startsWith('//')) {
    return '/';
  }

  return decoded;
};

export {
  AUTH_SIGN_IN_PATH,
  AUTH_CALLBACK_PATH,
  AUTH_DEFAULT_NEXT_PATH,
  SSO_START_PATH,
  SSO_EXCHANGE_PATH,
  SSO_ME_PATH,
  SSO_LOGOUT_PATH,
  normalizeRedirectPath,
};
