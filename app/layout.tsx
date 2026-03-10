import { siteMetadata } from '@/constants/meta';
import { siteViewport } from '@/constants/viewport';
import { RootLayoutProps } from '@/types/layout';

import '@/app/globals.css';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

export const generateMetadata = async () => siteMetadata;
export const viewport = siteViewport;
