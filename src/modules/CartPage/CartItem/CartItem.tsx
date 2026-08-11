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
  const { id, product, quantity } = item;

  return (
    <div className={styles.item}>
      {/* REMOVE BUTTON */}
      <button className={styles.iconBtn} onClick={() => remove(id)}>
        <img src="/img/icons/Close.svg" alt="Remove item" />
      </button>

      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className={styles.itemImage}
      />

      {/* PRODUCT NAME */}
      <span className={styles.itemName}>{product.name}</span>

      {/* QUANTITY + PRICE */}
      <div className={styles.bottomRow}>
        <div className={styles.quantity}>
          <button className={styles.qtyBtn} onClick={() => decrease(id)}>
            <img src="/img/icons/Minus.svg" alt="Decrease quantity" />
          </button>

          <span className={styles.qtyValue}>{quantity}</span>

          <button className={styles.qtyBtn} onClick={() => increase(id)}>
            <img src="/img/icons/Plus.svg" alt="Increase quantity" />
          </button>
        </div>

        <span className={styles.price}>${product.price * quantity}</span>
      </div>
    </div>
  );
};
