import { Image } from '@/components/atoms/image';
import styles from './SpotlightSection.module.css';

const spotlights = [
  {
    img: '/spotlight-craft3.png',
    title: 'Introducing Craft 3',
    desc: "Our biggest update in years and a showcase of our vision for Craft's future.",
    date: '28 November 2024',
  },
  {
    img: '/spotlight-kevin.png',
    title: 'How does Kevin Blanc use Craft?',
    desc: 'Craft User Stories: Behind the Scenes of Filmmaking with Kevin',
    date: '1.7k views 22 weeks ago',
  },
  // ... 추가 카드
];

export default function SpotlightSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Craft Spotlight</h2>
      <div className={styles.cardSlider}>
        {spotlights.map((item, i) => (
          <div key={i} className={styles.spotlightCard}>
            <Image src={item.img} className={styles.cardImg} alt={item.desc} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className={styles.cardMeta}>{item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
