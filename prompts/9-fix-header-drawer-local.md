# 9) Fix Header Drawer To Local Implementation

## Prompt

현재 header.tsx에서 사용하는 drawer는

```tsx
import { createPortal } from 'react-dom';

import { cn, ensurePortalRoot } from '@lib/index.ts';
import type { DrawerProps } from '@/ui';
import styles from './Drawer.module.css';

const Drawer = ({ open, onClose, title, children, placement = 'right', width }: DrawerProps) => {
  if (!open) return null;

  const panelStyle = width ? { width } : undefined;

  return createPortal(
    <div className={styles.container} role="presentation">
      <div className={styles.backdrop} onClick={onClose} />
      <aside
        className={cn(styles.panel, styles[placement])}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
      >
        <header className={styles.header}>
          <strong>{title}</strong>
          <button type="button" onClick={onClose} aria-label="Close drawer">
            ×
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </aside>
    </div>,
    ensurePortalRoot('drawer-root'),
  );
};

export { Drawer };
```

이 구조인데 수정해줘 잘 작동되게

## Work Summary

- Added local drawer component under `ui/` with portal rendering, ESC close, and body scroll lock.
- Added `cn` and `ensurePortalRoot` utilities in `libs/index.ts`.
- Switched header to use local `Drawer` from `@/ui` instead of package drawer.
- Removed redundant `BackDrop` usage in header to avoid double overlay.

## Validation

- Ran `npm run _typecheck`.
