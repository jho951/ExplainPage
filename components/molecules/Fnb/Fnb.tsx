import { Link } from '@/components/atoms/link';
import { FnbProps } from '@/components/molecules/fnb';

import styles from '@/components/molecules/fnb/Fnb.module.css';

function Fnb({ fnb }: FnbProps) {
  return (
    <nav className={styles.container}>
      {fnb.map(ele => (
        <div key={ele.id}>
          <h3 className={styles.fnbTitle}>{ele.label}</h3>
          <ul>
            {ele.children &&
              ele.children.map(link => (
                <li key={link.id}>
                  <Link
                    className={styles.fnbEle}
                    href={link.href}
                    target={link.target}
                    rel={link.target ? '_blank' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export { Fnb };
