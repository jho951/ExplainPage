import { ReactNode } from 'react';
import { Locale, LocaleMessages } from '@/types/locale';

/**
 * 번역 메시지 및 언어 코드 공통 타입
 */
interface TranslationContextBase {
  /** 현재 활성화된 메시지 객체 */
  messages: LocaleMessages;
  /** 현재 선택된 언어 코드 */
  lang: Locale;
}

/**
 * 번역 컨텍스트에서 사용하는 값 타입
 */
type TranslationContextType = TranslationContextBase;

/**
 * 번역 Provider 컴포넌트 Props 정의
 */
interface TranslateProviderProps extends TranslationContextBase {
  /** 자식 컴포넌트 (ReactNode) */
  children: ReactNode;
}

export type { TranslationContextType, TranslateProviderProps };
