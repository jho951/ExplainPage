import { Fnb } from '@/components/molecules/fnb';
import { FNB } from '@/constants/navigation.ts';
import styles from '@/components/organisms/footer/Footer.module.css';
import { FooterProps } from '@/components/organisms/footer';
import { FooterMeta } from '@/components/molecules/footer-meta/FooterMeta';

function Footer({ pathname }: FooterProps) {
  return (
    <footer className={styles.footerContainer}>
      <Fnb fnb={FNB} />
      <FooterMeta pathname={pathname} />
    </footer>
  );
}

export { Footer };
