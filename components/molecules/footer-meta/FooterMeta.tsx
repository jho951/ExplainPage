'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import styles from '@/components/molecules/footer-meta/FooterMeta.module.css';
import { FooterProps } from '@/components/organisms/footer';
import { Locale } from '@/types/locale';
import { LANGUAGE_OPTIONS } from '@/constants/locale';
import { COPY } from '@/constants/security';

import { Link } from '@/components/atoms/link';
import { SNS_LINK } from '@/constants/navigation.ts';
import { Dropdown, Icon, Spinner } from '@jho951/ui-components';

const ICON_BASE_PATH = '/icons';

function FooterMeta({ pathname }: FooterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const localeList: Locale[] = ['ko', 'en'];
  const segments = pathname.split('/');
  const maybeLang = segments[1];
  const currentLang: Locale = localeList.includes(maybeLang as Locale)
    ? (maybeLang as Locale)
    : 'ko';

  const handleLocaleChange = (nextLang: Locale) => {
    if (nextLang === currentLang) return;

    const [, maybeLang, ...rest] = pathname.split('/');
    const isCurrentLangDefault = !localeList.includes(maybeLang as Locale);

    const pathWithoutLocale = isCurrentLangDefault ? pathname : `/${rest.join('/')}`;
    const nextPath = nextLang === 'ko' ? pathWithoutLocale : `/${nextLang}${pathWithoutLocale}`;

    startTransition(() => {
      router.push(nextPath);
    });
  };

  const selectedLanguage = LANGUAGE_OPTIONS.find(l => l.value === currentLang)!;
  const languageItems = LANGUAGE_OPTIONS.map(({ value, label }) => ({ value, label }));

  return (
    <div className={styles.bottom}>
      <p className={styles.copy}>{COPY}</p>

      <div className={styles.languageAndIcons}>
        {isPending ? (
          <Spinner />
        ) : (
          <div className={styles.selectWrap}>
            <Icon
              className={styles.globe}
              name="globe"
              size={18}
              source="url"
              basePath={ICON_BASE_PATH}
            />
            <Dropdown
              items={languageItems}
              value={currentLang}
              onSelect={value => handleLocaleChange(value as Locale)}
              placeholder={selectedLanguage.label}
            />
          </div>
        )}

        <div className={styles.icons}>
          {SNS_LINK.map(({ id, href, icon }) => (
            <Link
              className={styles.iconLink}
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={id}
            >
              <Icon name={icon} size={18} source="url" basePath={ICON_BASE_PATH} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { FooterMeta };
