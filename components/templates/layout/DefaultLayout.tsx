import { LayoutProps } from '@/types/layout';
import { getMessages } from '@/utils/locale';
import { ReduxProvider } from '@/store/provider';
import { ThemeProvider } from '@/contexts/theme';
import { TranslationsProvider } from '@/contexts/translate';
import { ClientProvider } from '@/contexts/client';

export default async function DefaultLayout({ children, modal, params }: LayoutProps) {
  const { lang } = await params;
  const { common: messages } = getMessages(lang);

  return (
    <ReduxProvider>
      <ThemeProvider>
        <TranslationsProvider messages={messages} lang={lang}>
          <ClientProvider modal={modal}>{children}</ClientProvider>
        </TranslationsProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
