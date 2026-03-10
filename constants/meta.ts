import { Metadata } from 'next';

import { TITLE, DESCRIPTION, PROJECT_URL } from '@/constants/security';

const siteMetadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(PROJECT_URL || 'http://localhost:3000'),

  manifest: '/site.webmanifest',

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: PROJECT_URL || 'http://localhost:3000',
    siteName: TITLE,
  },

  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },

  alternates: {
    canonical: PROJECT_URL || 'http://localhost:3000',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

const notFoundMetadata: Metadata = {
  title: `404 페이지를 찾을 수 없습니다 - ${TITLE}`,
  description: '요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 이동하세요.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `404 페이지를 찾을 수 없습니다 - ${TITLE}`,
    description: '요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 이동하세요.',
    siteName: TITLE,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `404 페이지를 찾을 수 없습니다 - ${TITLE}`,
    description: '요청하신 페이지를 찾을 수 없습니다. URL을 확인하거나 홈으로 이동하세요.',
  },
};

export { siteMetadata, notFoundMetadata };
