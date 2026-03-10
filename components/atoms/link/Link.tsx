import React from 'react';
import NextLink from 'next/link';
import { cn } from '@jho951/ui-components';

import { usePathname } from 'next/navigation';
import { LinkProps } from '@/components/atoms/link';

/**
 * @file Link.tsx
 * @description
 * 공통 Link(링크) 컴포넌트입니다.
 * - 내부/외부 링크 자동 분기, active 상태, aria-current, className 등 일관된 링크 관리.
 * - Next.js App Router(usePathname) 기반, 필요시 외부 링크 자동 처리.
 *
 * @usage
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link href="https://naver.com" external>네이버</Link>
 * ```
 *
 * @prop {string} href - 이동할 경로(내부/외부)
 * @prop {boolean} [external] - 외부 링크 여부(자동 감지, 수동 지정 모두 지원)
 * @prop {ReactNode} children - 링크 텍스트/내용
 * @prop {string} [className] - 커스텀 클래스명
 * @prop {string} [activeClassName] - 활성(현재 위치) 시 클래스명 추가
 * @prop {boolean} [exact] - URL 완전 일치로 active 여부 결정 (기본 false, 하위경로까지 active)
 */

function Link({
  href,
  external,
  children,
  className,
  activeClassName = 'active',
  exact = false,
  ...rest
}: LinkProps) {
  const pathname = usePathname();
  const isExternal = external ?? /^https?:\/\//.test(href);
  let isActive = false;

  if (!isExternal && pathname) {
    if (exact) {
      isActive = pathname === href;
    } else {
      isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    }
  }

  if (isExternal) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(className, { [activeClassName]: isActive })}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </NextLink>
  );
}

export { Link };
