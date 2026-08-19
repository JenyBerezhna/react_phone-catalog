import { useState } from 'react';
import styles from './ItemInfo.module.scss';
import type { ProductDetails } from '../../../types/ProductDetails';

export interface ItemInfoProps {
  product: ProductDetails;
  selectedColor: string;
  selectedCapacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ItemInfo: React.FC<ItemInfoProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'camera' | 'specs'>(
    'about',
  );

  // SAFE FALLBACKS
  const about = product.description?.[0] ?? { title: 'About', text: [] };
  const camera = product.description?.[1] ?? { title: 'Camera', text: [] };

  return (
    <div className={styles.description}>
      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'about' ? styles.active : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>

        <button
          className={`${styles.tab} ${activeTab === 'camera' ? styles.active : ''}`}
          onClick={() => setActiveTab('camera')}
        >
          Camera
        </button>

        <button
          className={`${styles.tab} ${activeTab === 'specs' ? styles.active : ''}`}
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

            {about.text.length > 0 ? (
              about.text.map((p, i) => (
                <p key={i} className={styles.paragraph}>
                  {p}
                </p>
              ))
            ) : (
              <p className={styles.paragraph}>No information available.</p>
            )}
          </div>
        )}

        {/* CAMERA */}
        {activeTab === 'camera' && (
          <div>
            <h3 className={styles.title}>{camera.title}</h3>

            {camera.text.length > 0 ? (
              camera.text.map((p, i) => (
                <p key={i} className={styles.paragraph}>
                  {p}
                </p>
              ))
            ) : (
              <p className={styles.paragraph}>
                No camera information available.
              </p>
            )}
          </div>
        )}

        {/* TECH SPECS */}
        {activeTab === 'specs' && (
          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{product.screen ?? 'N/A'}</span>
            </div>

            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{product.resolution ?? 'N/A'}</span>
            </div>

            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{product.processor ?? 'N/A'}</span>
            </div>

            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{product.ram ?? 'N/A'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
