import { useState } from 'react';
import styles from './ItemGallery.module.scss';

export const ItemGallery = ({ images }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <button
            key={img}
            className={`${styles.thumb} ${i === active ? styles.active : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={img} alt="" />
          </button>
        ))}
      </div>

      <div className={styles.main}>
        <img src={images[active]} alt="Item" />
      </div>
    </div>
  );
};
