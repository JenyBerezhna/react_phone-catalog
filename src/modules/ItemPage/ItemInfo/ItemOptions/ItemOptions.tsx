import styles from './ItemOptions.module.scss';

interface ItemOptionsProps {
  colors: string[];
  capacities: string[];
  selectedColor: string;
  selectedCapacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ItemOptions = ({
  colors,
  capacities,
  selectedColor,
  selectedCapacity,
  onColorChange,
  onCapacityChange,
}: ItemOptionsProps) => {
  return (
    <div className={styles.options}>
      {/* COLORS */}
      <div className={styles.block}>
        <p className={styles.label}>Available colors</p>
        <div className={styles.colors}>
          {colors.map(color => (
            <button
              key={color}
              className={`${styles.color} ${
                color === selectedColor ? styles.active : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      {/* CAPACITY */}
      <div className={styles.block}>
        <p className={styles.label}>Select capacity</p>
        <div className={styles.capacity}>
          {capacities.map(cap => (
            <button
              key={cap}
              className={`${styles.cap} ${
                cap === selectedCapacity ? styles.active : ''
              }`}
              onClick={() => onCapacityChange(cap)}
            >
              {cap}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
