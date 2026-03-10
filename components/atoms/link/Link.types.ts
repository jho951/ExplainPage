import { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export type { LinkProps };
