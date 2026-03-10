import { useContext } from 'react';

import { Locale, LocaleMessages } from '@/types/locale';
import { TranslationsContext } from '@/contexts/translate';

/**
 * @function useTranslation
 * @description
 * TranslationsProvider로 감싸진 컴포넌트 트리 내에서 다국어 메시지와 현재 언어 정보를 제공합니다.
 * messages 객체를 통해 각 페이지/컴포넌트에서 다국어 텍스트를 가져올 때 사용됩니다.
 *
 * @throws {Error} - TranslationsProvider 외부에서 사용할 경우 에러가 발생합니다.
 *
 * @returns {{
 *   messages: LocaleMessages;
 *   lang: string;
 * }}
 *
 * @example
 * ```tsx
 * import { useTranslation } from '@/hooks/useTranslation';
 *
 * export default function HomeTitle() {
 *   const { messages } = useTranslation();
 *   return <h1>{messages.home.title}</h1>;
 * }
 * ```
 */
function useTranslation(): {
  messages: LocaleMessages;
  lang: Locale;
} {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationsProvider');
  }
  return context;
}

export { useTranslation };
