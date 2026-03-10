import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon, Menu, type MenuItem } from '@jho951/ui-components';

import { GNB } from '@/constants/navigation.ts';
import { TITLE } from '@/constants/security';
import { HeaderProps } from '@/components/organisms/header/Header.types.ts';
import { Logo } from '@/components/molecules/logo';
import { ICON_BASE_PATH } from '@/constants/icon.ts';
import { useIsMobile } from '@/hooks/useDevice';

import styles from '@/components/organisms/header/Header.module.css';

function Header({ pathname }: HeaderProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [desktopOpenIndex, setDesktopOpenIndex] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

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

  const getMenuItems = (idx: number): MenuItem[] =>
    (GNB[idx]?.children ?? []).map(item => ({
      id: item.id,
      label: item.label,
      onSelect: () => navigate(item.href, item.target),
    }));

  const updateExpandedHeight = () => {
    const headerEl = headerRef.current;
    const panelEl = panelRef.current;
    if (!headerEl || !panelEl || !isMobile || !isExpanded) return;

    const headerBase =
      Number.parseFloat(getComputedStyle(headerEl).getPropertyValue('--header-h')) || 64;
    const contentHeight = panelEl.scrollHeight;
    const next = Math.ceil(headerBase + contentHeight);

    setExpandedHeight(prev => (prev === next ? prev : next));
  };

  useLayoutEffect(() => {
    if (!isMobile || !isExpanded) {
      setExpandedHeight(null);
      return;
    }

    const raf = requestAnimationFrame(updateExpandedHeight);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, isExpanded, openCategoryId]);

  useEffect(() => {
    if (!isMobile || !isExpanded || !panelRef.current) return;

    const observer = new ResizeObserver(() => updateExpandedHeight());
    observer.observe(panelRef.current);

    return () => observer.disconnect();
  }, [isMobile, isExpanded]);

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
          <nav className={styles.desktopNav} aria-label="global navigation">
            {GNB.map((menu, idx) => {
              const items = getMenuItems(idx);
              return (
                <div className={styles.navItem} key={menu.id}>
                  <Button
                    type="button"
                    variant="text"
                    className={styles.navTrigger}
                    aria-expanded={desktopOpenIndex === idx}
                    aria-controls={`header-menu-${menu.id}`}
                    onClick={() => setDesktopOpenIndex(prev => (prev === idx ? null : idx))}
                  >
                    {menu.label}
                  </Button>
                  {desktopOpenIndex === idx && items.length > 0 && (
                    <div id={`header-menu-${menu.id}`} className={styles.menuLayer}>
                      <Menu items={items} onRequestClose={() => setDesktopOpenIndex(null)} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        <nav className={styles.gnbBtn} aria-label="Header actions">
          {isMobile && (
            <button
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
            </button>
          )}
        </nav>
      </div>

      {isMobile && (
        <div
          ref={panelRef}
          className={styles.headerExpandContent}
          id="ttHeaderPanel"
          aria-hidden={!isExpanded}
        >
          <div className={styles.menuList}>
            <ul className={styles.categoryList}>
              {GNB.map(menu => {
                const hasChildren = Boolean(menu.children?.length);
                const isCategoryOpen = openCategoryId === menu.id;

                return (
                  <li key={menu.id} className={hasChildren ? styles.hasChildren : undefined}>
                    <Button
                      type="button"
                      variant="text"
                      className={styles.linkItem}
                      aria-expanded={hasChildren ? isCategoryOpen : undefined}
                      onClick={() => {
                        if (!hasChildren) {
                          navigate(menu.href, menu.target);
                          return;
                        }

                        setOpenCategoryId(prev => (prev === menu.id ? null : menu.id));
                      }}
                    >
                      <span>{menu.label}</span>
                    </Button>

                    {hasChildren && (
                      <ul
                        className={`${styles.subCategoryList} ${isCategoryOpen ? styles.subCategoryListOpen : ''}`}
                      >
                        {menu.children?.map(child => (
                          <li key={child.id}>
                            <Button
                              type="button"
                              variant="text"
                              className={styles.linkSubItem}
                              onClick={() => navigate(child.href, child.target)}
                            >
                              {child.label}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.menuFooter}>
            <Button type="button" variant="primary" onClick={() => navigate('/signin')}>
              로그인
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
