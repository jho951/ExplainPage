import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import styles from '@/components/features/LegalPage.module.css';
import { PageProps } from '@/types/layout';

const legalContent: Record<string, string> = {
  privacy: 'This is our Privacy Policy.',
  terms: 'These are our Terms of Service.',
  security: 'Information about our Security policy.',
  esg: 'Environmental, Social, and Governance content.',
  'responsible-disclosure': 'Responsible Disclosure policy details.',
};

export async function generateMetadata({
  params,
}: {
  params: PageProps['params'];
}): Promise<Metadata> {
  const slug = params.slug?.[1];
  return {
    title: slug ? `Legal - ${slug}` : 'Legal',
  };
}

export default async function LegalPage({ params }: PageProps) {
  const slug = params.slug?.[1];
  const content = slug ? legalContent[slug] : null;

  if (!slug || !content) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{slug.replace(/-/g, ' ')}</h1>
      <p className={styles.content}>{content}</p>
    </main>
  );
}
