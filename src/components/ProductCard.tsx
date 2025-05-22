import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from './common/Badge';
import SafeImage from './common/SafeImage';
import { formatPrice } from '../utils/helpers';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  isNew, 
  isSale, 
  salePrice,
  category 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const formattedPrice = formatPrice(price);

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <Link to={`/products/${id}`}>
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <SafeImage
              src={imageUrl}
              alt={name}
              category={category}
              productId={id}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {isNew && <Badge variant="new">New</Badge>}
          {isSale && <Badge variant="sale">Sale</Badge>}
        </div>
        
        {/* Wishlist Button */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FavoriteIcon className="text-red-500 text-sm" style={{ fontSize: '1.1rem' }} />
          ) : (
            <FavoriteBorderIcon className="text-gray-600 text-sm" style={{ fontSize: '1.1rem' }} />
          )}
        </button>
      </div>
      
      <div className="p-3">
        {category && (
          <p className="text-xs text-gray-500 mb-1">{category}</p>
        )}
        <Link to={`/products/${id}`}>
          <h3 className="font-medium text-base mb-1 hover:text-primary-gold transition-colors line-clamp-1">{name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          {isSale && salePrice && (
            <>
              <span className="text-red-500 font-medium text-sm">{formatPrice(salePrice)}</span>
              <span className="text-gray-400 line-through text-xs">{formattedPrice}</span>
            </>
          )}
          {!isSale && (
            <span className="font-medium text-sm">{formattedPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;