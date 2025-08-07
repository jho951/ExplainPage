import { notFound } from 'next/navigation';

import { getMarkdownContent } from '@/libs/get-mdx-content';
import { getAllSlugs } from '@/libs/get-all-slugs';
import { MDXRemote } from 'next-mdx-remote';

export async function generateStaticParams() {
  const langs = ['ko', 'en'];
  return langs.flatMap(lang => getAllSlugs(lang).map(slug => ({ lang, slug })));
}

type Props = { params: { lang: string; slug: string } };

export default async function PostPage({ params }: Props) {
  const { lang, slug } = params;
  const data = await getMarkdownContent(slug, lang);

  if (!data) notFound();

  return (
    <article>
      <h1>{data.frontMatter.title}</h1>
      <MDXRemote {...data.mdxSource} />
    </article>
  );
}
