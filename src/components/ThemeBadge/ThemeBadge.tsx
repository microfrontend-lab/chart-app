import clsx from 'clsx';
import type { WidgetProps } from '@/types/widget';
import styles from './ThemeBadge.module.css';

export interface ThemeBadgeProps {
  theme?: WidgetProps['theme'];
}

function readAmbientTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

// Shows the `theme` prop's actual value, live, so it's visible that this
// widget receives it as data from the portal — not just that its CSS happens
// to re-theme (which would look identical even if `theme` were never passed).
export function ThemeBadge({ theme }: ThemeBadgeProps) {
  const isFromPortal = theme !== undefined;
  const resolved = theme ?? readAmbientTheme();

  return (
    <div className={styles.bar}>
      <span className={clsx(styles.badge, resolved === 'light' && styles.light)}>
        Theme: {resolved}
      </span>
      <span className={styles.source}>
        {isFromPortal ? 'via theme prop from portal' : 'standalone default'}
      </span>
    </div>
  );
}
