import { useCart } from '../../shared/context/CartContext';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const { items, addToCart } = useCart();

  const isInCart = items.some(item => item.id === product.id);

  const { price, fullPrice } = product;
  const hasDiscount = fullPrice > price;

  return (
    <div className="product-card">
      <div className="product-card__price">
        {showDiscount && hasDiscount ? (
          <>
            <span className="price price--discount">${price}</span>
            <span className="price price--full">${fullPrice}</span>
          </>
        ) : (
          <span className="price price--discount">${price}</span>
        )}
      </div>

      <button disabled={isInCart} onClick={() => addToCart(product)}>
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>
    </div>
  );
};
