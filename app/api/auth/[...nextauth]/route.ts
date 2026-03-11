import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { createAuthOptions } from '@/libs/auth';
import { checkRateLimit } from '@/libs/rate-limit';

const getHandler = () => NextAuth(createAuthOptions());

const AUTH_WINDOW_MS = 5 * 60 * 1000;
const AUTH_LIMIT = 20;

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
};

const shouldLimitAuthRequest = (pathname: string) => {
  return pathname.startsWith('/api/auth/signin') || pathname.startsWith('/api/auth/callback');
};

const runRateLimit = (request: NextRequest) => {
  if (!shouldLimitAuthRequest(request.nextUrl.pathname)) {
    return null;
  }

  const ip = getClientIp(request);
  const result = checkRateLimit({
    key: `auth:${ip}`,
    limit: AUTH_LIMIT,
    windowMs: AUTH_WINDOW_MS,
  });

  if (result.allowed) {
    return null;
  }

  const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));

  return NextResponse.json(
    {
      message: 'Too many authentication attempts. Please try again in a few minutes.',
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
      },
    },
  );
};

const GET = async (request: NextRequest, context: unknown) => {
  const rateLimitResponse = runRateLimit(request);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  return getHandler()(request, context);
};

const POST = async (request: NextRequest, context: unknown) => {
  const rateLimitResponse = runRateLimit(request);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  return getHandler()(request, context);
};

export { GET, POST };
