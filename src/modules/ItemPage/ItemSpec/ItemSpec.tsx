import { useState } from 'react';
import styles from './ItemSpec.module.scss';
import type { ProductDetails } from '../../../types/ProductDetails';

interface ItemSpecProps {
  item: ProductDetails;
}

export const ItemSpec: React.FC<ItemSpecProps> = ({ item }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'camera' | 'specs'>(
    'about',
  );

  const about = item.description[0];
  const camera = item.description[1];

  return (
    <div className={styles.description}>
      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === 'about' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === 'camera' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('camera')}
        >
          Camera
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === 'specs' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('specs')}
        >
          Tech specs
        </button>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* ABOUT */}
        {activeTab === 'about' && (
          <div>
            <h3 className={styles.title}>{about.title}</h3>

            {about.text.map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        )}

        {/* CAMERA */}
        {activeTab === 'camera' && (
          <div>
            <h3 className={styles.title}>{camera.title}</h3>

            {camera.text.map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        )}

        {/* TECH SPECS */}
        {activeTab === 'specs' && (
          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{item.screen}</span>
            </div>

            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{item.resolution}</span>
            </div>

            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{item.processor}</span>
            </div>

            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{item.ram}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
