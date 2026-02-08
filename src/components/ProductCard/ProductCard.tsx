import { useCart } from '../../shared/context/CartContext';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { items, addToCart } = useCart();

  const isInCart = items.some(item => item.id === product.id);

  return (
    <button disabled={isInCart} onClick={() => addToCart(product)}>
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
