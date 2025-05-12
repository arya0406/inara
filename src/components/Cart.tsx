import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/helpers';
import Button from '../common/Button';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-4 border-b">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              {item.category && (
                <p className="text-sm text-gray-500">{item.category}</p>
              )}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <Button variant="primary" fullWidth>
          Checkout
        </Button>
        <Button variant="outline" fullWidth>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default Cart;
