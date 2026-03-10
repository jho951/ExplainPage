import { Theme } from '@/types/theme';

/**
 * ThemeContextProps interface 설명을 여기에 작성하세요.
 */
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export type { ThemeContextProps };
