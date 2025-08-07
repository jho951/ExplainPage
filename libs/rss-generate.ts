import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import RSS from 'rss';
import { DESCRIPTION, PROJECT_URL, TITLE } from '../constants/security.ts';

const feed = new RSS({
  title: TITLE,
  description: DESCRIPTION,
  feed_url: `${PROJECT_URL}/rss.xml`,
  site_url: PROJECT_URL,
  language: 'ko',
});

const contentDir = path.join(process.cwd(), 'content', 'ko');
const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));

files.forEach(file => {
  const filePath = path.join(contentDir, file);
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(source);

  if (!data.title || !data.date || !data.slug) return;

  feed.item({
    title: data.title,
    date: data.date,
    url: `${PROJECT_URL}/ko/${data.slug}`,
    description: data.summary || '',
  });
});

fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
