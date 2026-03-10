import { ThemeContextProps } from '@/contexts/theme';
import { Theme } from '@/types/theme';
import { useEffect, useState } from 'react';

/**
 * 다크 모드 상태를 관리하는 사용자 정의 훅입니다.
 * 사용자의 시스템 설정 또는 저장된 localStorage 값을 기반으로 초기 테마를 결정합니다.
 *
 * @returns {{
 *   theme: Theme;
 *   toggleTheme: () => void;
 * }} 현재 테마와 토글 함수
 *
 * @example
 * const { theme, toggleTheme } = useDarkMode();
 */

function useDarkMode(): ThemeContextProps {
  const [theme, setTheme] = useState<Theme>('light');

  // 초기 테마 설정: localStorage > prefers-color-scheme
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // 테마 변경 시 <html>에 class 적용 및 localStorage 저장
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 테마 토글 함수
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}

export { useDarkMode };
