import { notFound } from 'next/navigation';

import { getMarkdownContent } from '@/libs/get-mdx-content';
import { getAllSlugs } from '@/libs/get-all-slugs';
import { MDXRemote } from 'next-mdx-remote';

type Props = { params: { locale: string; slug: string } };

// 정적 경로 생성
export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  return locales.flatMap(locale => {
    const slugs = getAllSlugs(locale) ?? [];
    return slugs
      .filter(Boolean) // undefined/null/'' 제거
      .map(slug => ({ locale, slug }));
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = params;
  const data = await getMarkdownContent(slug, locale);

  if (!data) notFound();

  return (
    <article>
      <h1>{data.frontMatter.title}</h1>
      <MDXRemote {...data.mdxSource} />
    </article>
  );
}
