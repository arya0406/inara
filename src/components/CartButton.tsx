import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from './common/Badge';

interface CartButtonProps {
  itemCount?: number;
}

const CartButton = ({ itemCount = 0 }: CartButtonProps) => {
  return (
    <Link to="/cart" className="relative p-2 hover:text-primary-gold transition-colors">
      <ShoppingCartIcon />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
