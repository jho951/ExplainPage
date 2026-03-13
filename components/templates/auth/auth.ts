import { ReactNode } from 'react';

interface AuthTemplateProps {
  title: ReactNode;
  desc: ReactNode;
  dividerText: ReactNode;
}

interface SignInTemplateProps {
  title: string;
  desc: string;
  dividerText?: string;
  authConfigured?: boolean;
  nextPath?: string;
}

export type { AuthTemplateProps, SignInTemplateProps };
