import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../../types';

interface CartItemProps {
  item: CartItemType;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  increase,
  decrease,
  remove,
}) => {
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <button className={styles.remove} onClick={() => remove(item.id)}>
        <img src="/img/icons/Close.svg" alt="Remove" />
      </button>
      <img
        src={product.image}
        alt={product.name}
        className={styles.itemImage}
      />

      <span className={styles.itemName}>{product.name}</span>

      <div className={styles.quantity}>
        <button className={styles.qtyBtn} onClick={() => decrease(item.id)}>
          <img src="/img/icons/Minus.svg" alt="Decrease" />
        </button>

        <span className={styles.qtyValue}>{quantity}</span>

        <button className={styles.qtyBtn} onClick={() => increase(item.id)}>
          <img src="/img/icons/Plus.svg" alt="Increase" />
        </button>
      </div>

      <span className={styles.price}>${product.price * quantity}</span>
    </div>
  );
};
