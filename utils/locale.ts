import { LOOKUP } from '@/constants/locale';
import { Locale, LocaleMessages } from '@/types/locale';

/**
 * @function getMessages
 * @description
 * 로케일별 메시지 객체(common)를 반환합니다.
 *
 * @param {Locale} locale - 현재 로케일
 * @returns {{ common: LocaleMessages }} 메시지 객체
 */
function getMessages(locale: Locale): { common: LocaleMessages } {
  const messages = LOOKUP[locale] ?? LOOKUP['en'];
  return { common: messages };
}

export { getMessages };
