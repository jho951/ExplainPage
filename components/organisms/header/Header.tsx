import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon, type MenuItem } from '@jho951/ui-components';

import { AUTH_DEFAULT_NEXT_PATH } from '@/constants/auth';
import { GNB } from '@/constants/navigation.ts';
import { TITLE } from '@/constants/security';
import { HeaderProps } from '@/components/organisms/Header/Header.types.ts';
import { HeaderAuthActions, HeaderDesktopNav, HeaderMobileMenu } from '@/components/molecules/gnb';
import { Logo } from '@/components/molecules/Logo';
import { ICON_BASE_PATH } from '@/constants/icon.ts';
import { useIsMobile } from '@/hooks/useDevice';
import { buildStartFrontendSignInUrl } from '@/libs/auth-routing';
import { logoutAuthSession } from '@/libs/auth-client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAuthState } from '@/store/slices/auth-slice';

import styles from '@/components/organisms/Header/Header.module.css';

function Header({ pathname }: HeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const authStatus = useAppSelector(state => state.auth.status);

  const [isExpanded, setIsExpanded] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [desktopOpenIndex, setDesktopOpenIndex] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const isAuthenticated = authStatus === 'authenticated';
  const isAuthBusy = authStatus === 'loading';

  const closeAll = () => {
    setIsExpanded(false);
    setOpenCategoryId(null);
    setDesktopOpenIndex(null);
  };

  const isExternalHref = (href: string, target?: string) =>
    target === '_blank' ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:');

  const navigate = (href: string, target?: string) => {
    if (isExternalHref(href, target)) {
      window.open(href, target ?? '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }

    closeAll();
  };

  const handleLogout = async () => {
    try {
      await logoutAuthSession();
    } finally {
      dispatch(clearAuthState());
      closeAll();
      router.replace('/');
    }
  };

  const getMenuItems = (idx: number): MenuItem[] =>
    (GNB[idx]?.children ?? []).map(item => ({
      id: item.id,
      label: item.label,
      onSelect: () => navigate(item.href, item.target),
    }));

  const updateExpandedHeight = useCallback(() => {
    const headerEl = headerRef.current;
    const panelEl = panelRef.current;
    if (!headerEl || !panelEl || !isMobile || !isExpanded) return;

    const headerBase =
      Number.parseFloat(getComputedStyle(headerEl).getPropertyValue('--header-h')) || 64;
    const contentHeight = panelEl.scrollHeight;
    const next = Math.ceil(headerBase + contentHeight);

    setExpandedHeight(prev => (prev === next ? prev : next));
  }, [isExpanded, isMobile]);

  useLayoutEffect(() => {
    if (!isMobile || !isExpanded) {
      setExpandedHeight(null);
      return;
    }

    const raf = requestAnimationFrame(updateExpandedHeight);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, isExpanded, openCategoryId, updateExpandedHeight]);

  useEffect(() => {
    if (!isMobile || !isExpanded || !panelRef.current) return;

    const observer = new ResizeObserver(() => updateExpandedHeight());
    observer.observe(panelRef.current);

    return () => observer.disconnect();
  }, [isMobile, isExpanded, updateExpandedHeight]);

  const headerStyle: CSSProperties | undefined =
    isMobile && expandedHeight
      ? ({ '--header-expanded-h': `${expandedHeight}px` } as CSSProperties)
      : undefined;

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isMobile && isExpanded ? styles.isExpanded : ''}`}
      style={headerStyle}
    >
      <div className={styles.headerInner}>
        <div className={styles.homeBtn}>
          <Logo pathname={pathname} onClick={closeAll} text={TITLE} />
        </div>

        {!isMobile && (
          <HeaderDesktopNav
            desktopOpenIndex={desktopOpenIndex}
            getMenuItems={getMenuItems}
            onCloseMenu={() => setDesktopOpenIndex(null)}
            onToggleMenu={index => setDesktopOpenIndex(prev => (prev === index ? null : index))}
          />
        )}

        <nav className={styles.gnbBtn} aria-label="Header actions">
          {!isMobile && (
            <HeaderAuthActions
              isAuthenticated={isAuthenticated}
              isBusy={isAuthBusy}
              onLogin={() => navigate(buildStartFrontendSignInUrl())}
              onStart={() =>
                navigate(
                  isAuthenticated
                    ? AUTH_DEFAULT_NEXT_PATH
                    : buildStartFrontendSignInUrl(AUTH_DEFAULT_NEXT_PATH),
                )
              }
              onLogout={handleLogout}
            />
          )}
          {isMobile && (
            <Button
              variant="text"
              type="button"
              className={`${styles.btn} ${styles.ghost}`}
              aria-label={isExpanded ? '메뉴 닫기' : '메뉴 열기'}
              aria-controls="ttHeaderPanel"
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded(prev => !prev)}
            >
              {isExpanded ? (
                <Icon name="close" source="url" basePath={ICON_BASE_PATH} size={28} />
              ) : (
                <Icon name="hamburger" source="url" basePath={ICON_BASE_PATH} size={28} />
              )}
            </Button>
          )}
        </nav>
      </div>

      {isMobile && (
        <HeaderMobileMenu
          panelRef={panelRef}
          isExpanded={isExpanded}
          openCategoryId={openCategoryId}
          onNavigate={navigate}
          isAuthenticated={isAuthenticated}
          isAuthBusy={isAuthBusy}
          onLogout={handleLogout}
          onToggleCategory={categoryId =>
            setOpenCategoryId(prev => (prev === categoryId ? null : categoryId))
          }
        />
      )}
    </header>
  );
}

export { Header };
