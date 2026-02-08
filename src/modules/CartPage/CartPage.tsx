import { useCart } from '../../shared/context/CartContext';

export const CartPage = () => {
  const { items, totalPrice, removeFromCart, increase, decrease, clearCart } =
    useCart();

  if (!items.length) {
    return <p>Your cart is empty</p>;
  }

  const handleCheckout = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <section>
      <h1>Cart</h1>

      {items.map(item => (
        <div key={item.id}>
          <button onClick={() => removeFromCart(item.id)}>×</button>

          <span>{item.product.name}</span>

          <button onClick={() => decrease(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increase(item.id)}>+</button>

          <span>${item.product.price * item.quantity}</span>
        </div>
      ))}

      <hr />

      <h2>Total: ${totalPrice}</h2>

      <button onClick={handleCheckout}>Checkout</button>
    </section>
  );
};
