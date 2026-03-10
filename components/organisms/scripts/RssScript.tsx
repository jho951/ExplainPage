import Script from 'next/script';

interface RssScriptProps {
  lang: string;
}

function RssScript({ lang }: RssScriptProps) {
  const href = lang === 'ko' ? '/rss.xml' : `/${lang}/rss.xml`;

  return (
    <Script id="rss-link-script" strategy="afterInteractive">
      {`
        (function () {
          const existing = document.querySelector('link[data-rss-link="true"]');
          if (existing) return;
          const link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('type', 'application/rss+xml');
          link.setAttribute('title', 'RSS Feed');
          link.setAttribute('href', '${href}');
          link.setAttribute('data-rss-link', 'true');
          document.head.appendChild(link);
        })();
      `}
    </Script>
  );
}

export default RssScript;
