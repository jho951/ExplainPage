import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { NEXTAUTH_SECRET_KEY } from '@/constants/security';
import { LOCALE_COOKIE, SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/constants/locale';
import type { Locale } from '@/types/locale';

function isLocale(x: string): x is Locale {
  return SUPPORTED_LOCALES.includes(x as Locale);
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  if (!NEXTAUTH_SECRET_KEY) {
    return false;
  }

  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET_KEY,
  });

  return Boolean(token);
}

function isProtectedPath(pathname: string): boolean {
  if (pathname === '/app' || pathname.startsWith('/app/')) {
    return true;
  }

  return SUPPORTED_LOCALES.some(
    locale => pathname === `/${locale}/app` || pathname.startsWith(`/${locale}/app/`),
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(png|jpe?g|svg|css|js|ico|woff2?|map)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ 로그인 보호: /app 하위는 인증 필요
  if (isProtectedPath(pathname) && !(await isAuthenticated(req))) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/signin';
    return NextResponse.redirect(loginUrl);
  }

  // ✅ locale 경로 리디렉션
  if (firstSegment === DEFAULT_LOCALE) {
    const restPath = segments.slice(1).join('/');
    const url = req.nextUrl.clone();
    url.pathname = `/${restPath}`;
    return NextResponse.redirect(url);
  }

  // ✅ 루트: 기본 locale 쿠키 설정
  if (pathname === '/') {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, DEFAULT_LOCALE, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return res;
  }

  // ✅ URL이 locale이면 해당 locale 쿠키로 설정
  if (isLocale(firstSegment)) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
    return res;
  }

  // ✅ locale이 빠진 경우 locale 붙여주기
  const lang = req.cookies.get(LOCALE_COOKIE)?.value ?? DEFAULT_LOCALE;

  if (lang !== DEFAULT_LOCALE && isLocale(lang)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
