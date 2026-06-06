import styles from './ItemInfo.module.scss';

export const ItemInfo = ({
  item,
  selectedColor,
  selectedCapacity,
  onColorChange,
  onCapacityChange,
}) => {
  const price = item.priceByCapacity[selectedCapacity];

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{item.name}</h1>

      <div className={styles.prices}>
        <span className={styles.current}>${price}</span>
        <span className={styles.full}>${item.fullPrice}</span>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>Available colors</p>
        <div className={styles.colors}>
          {item.colors.map(color => (
            <button
              key={color}
              className={`${styles.color} ${color === selectedColor ? styles.active : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>Select capacity</p>
        <div className={styles.capacity}>
          {item.capacity.map(cap => (
            <button
              key={cap}
              className={`${styles.cap} ${cap === selectedCapacity ? styles.active : ''}`}
              onClick={() => onCapacityChange(cap)}
            >
              {cap}
            </button>
          ))}
        </div>
      </div>

      <button className={styles.addToCart}>Add to cart</button>

      <div className={styles.specs}>
        <div className={styles.row}>
          <span>Screen</span>
          <span>{item.screen}</span>
        </div>
        <div className={styles.row}>
          <span>Resolution</span>
          <span>{item.resolution}</span>
        </div>
        <div className={styles.row}>
          <span>Processor</span>
          <span>{item.processor}</span>
        </div>
        <div className={styles.row}>
          <span>RAM</span>
          <span>{item.ram}</span>
        </div>
      </div>
    </div>
  );
};
