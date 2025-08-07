import { ClientLayoutWrapper } from '@/components/organisms/wrapper/ClientLayoutWrapper';

import { getMessages } from '@/utils/locale';

import { ThemeProvider } from '@/contexts/ThemeContext';

import { TranslationsProvider } from '@/contexts/TranslationContext';
import { LayoutProps } from '@/types/layout';

export default async function DefaultLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const { common: messages } = getMessages(lang);

  return (
    <ThemeProvider>
      <TranslationsProvider messages={messages} lang={lang}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </TranslationsProvider>
    </ThemeProvider>
  );
}
