import Link from 'next/link';
import Image from 'next/image';

import { LogoProps } from '@/components/molecules/logo';
import { ICON_BASE_PATH } from '@/constants/icon.ts';
import styles from '@/components/molecules/logo/Logo.module.css';

function Logo({ pathname, onClick, text = 'Skill Blog' }: LogoProps) {
  return (
    <Link
      className={styles.link}
      href="/"
      aria-label="홈으로 이동"
      aria-current={pathname === '/' ? 'page' : undefined}
      onClick={onClick}
    >
      <Image
        src={`${ICON_BASE_PATH}/logo.svg`}
        alt=""
        width={40}
        height={40}
        className={styles.icon}
      />
      <h1 className="sr-only">{text}</h1>
    </Link>
  );
}

export { Logo };
