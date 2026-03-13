import type { MenuItem } from '@jho951/ui-components';
import type { RefObject } from 'react';

interface HeaderAuthActionsProps {
  mobile?: boolean;
  isAuthenticated?: boolean;
  isBusy?: boolean;
  onLogin: () => void;
  onStart: () => void;
  onLogout: () => void;
}

interface HeaderMobileMenuProps {
  panelRef: RefObject<HTMLDivElement | null>;
  isExpanded: boolean;
  openCategoryId: string | null;
  onToggleCategory: (categoryId: string) => void;
  onNavigate: (href: string, target?: string) => void;
  isAuthenticated: boolean;
  isAuthBusy: boolean;
  onLogout: () => void;
}

interface HeaderDesktopNavProps {
  desktopOpenIndex: number | null;
  onToggleMenu: (index: number) => void;
  onCloseMenu: () => void;
  getMenuItems: (index: number) => MenuItem[];
}

export type { HeaderMobileMenuProps, HeaderDesktopNavProps, HeaderAuthActionsProps };
