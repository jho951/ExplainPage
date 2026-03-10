import { Image } from '@/components/atoms/image';
import styles from './PromoTiles.module.css';

const tiles = [
  {
    img: '/promo-creative.png',
    color: '#d0e6f7',
    title: 'Make it yours',
    desc: 'Go from refined minimalism to bold creativity with one quick tap.',
  },
  {
    img: '/promo-detail.png',
    color: '#123763',
    title: 'Customize Every Detail',
    desc: 'Add a nice touch with highlights, backgrounds and more.',
  },
  {
    img: '/promo-styles.png',
    color: '#bda490',
    title: 'Dress to impress',
    desc: 'Choose from over 100 premade styles. Select a style, and apply.',
  },
];

export default function PromoTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.cardGrid}>
        {tiles.map((tile, i) => (
          <div className={styles.card} key={i} style={{ background: tile.color }}>
            <Image src={tile.img} className={styles.cardImg} alt={tile.desc} />
            <h3>{tile.title}</h3>
            <p>{tile.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
