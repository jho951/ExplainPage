'use client';

import { createContext, useEffect, useMemo } from 'react';
import { TranslateProviderProps, TranslationContextType } from '@/contexts/TranslationContext';

// ✅ 1. 명확한 초기값 없이 null로 처리 + 안전한 fallback 제공
const TranslationsContext = createContext<TranslationContextType | null>(null);

// ✅ 2. Provider: useMemo로 value 최적화
function TranslationsProvider({ messages, lang, children }: TranslateProviderProps) {
  const value = useMemo(() => ({ messages, lang }), [messages, lang]);

  // ✅ 3. lang이 바뀔 때마다 document.documentElement.lang 갱신
  useEffect(() => {
    document.documentElement.lang = lang || 'ko';
  }, [lang]);

  return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>;
}

// ✅ 4. 디버깅 편의성: displayName 설정
TranslationsContext.displayName = 'TranslationsContext';

export { TranslationsProvider, TranslationsContext };
