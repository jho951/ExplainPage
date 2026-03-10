import clsx, { type ClassValue } from 'clsx';

const cn = (...inputs: ClassValue[]) => clsx(...inputs);

const ensurePortalRoot = (id: string): HTMLElement | null => {
  if (typeof document === 'undefined') return null;

  let root = document.getElementById(id);
  if (!root) {
    root = document.createElement('div');
    root.id = id;
    document.body.appendChild(root);
  }

  return root;
};

export { cn, ensurePortalRoot };
