import styles from './Hero.module.scss';
import { useSlider } from '../../../../hooks/useSlider';

const images = [
  '/img/banner-phones.jpg',
  '/img/banner-tabs.jpeg',
  '/img/banner-accessor.png',
];

export const Hero = () => {
  const { index, next, prev, goTo } = useSlider(images.length, 5000);

  return (
    <div className={styles.slider}>
      <button onClick={prev}>‹</button>

      <img src={images[index]} alt="Banner" />

      <button onClick={next}>›</button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={i === index ? styles.active : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};
