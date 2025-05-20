import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from './common/Badge';
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
  const [imageError, setImageError] = useState(false);
  const formattedPrice = formatPrice(price);
    // Fallback image for when the product image fails to load
  const fallbackImage = category === 'Bracelets'
    ? '/images/products/bracelets/bracelet-main.jpg'
    : '/images/products/pendant-1.jpg';

  // Pre-check image path to handle problematic bracelet images
  const safeImageUrl = category === 'Bracelets' && (!imageUrl || imageUrl.includes('IMG-20250512-WA'))
    ? fallbackImage
    : imageUrl;

  return (
    <div className="product-card group">      <div className="relative overflow-hidden">        <Link to={`/products/${id}`}>
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={imageError ? fallbackImage : safeImageUrl}
              alt={name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && <Badge variant="new">New</Badge>}
          {isSale && <Badge variant="sale">Sale</Badge>}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FavoriteIcon className="text-red-500" />
          ) : (
            <FavoriteBorderIcon className="text-gray-600" />
          )}
        </button>
      </div>

      <div className="p-4">
        {category && (
          <p className="text-sm text-gray-500 mb-1">{category}</p>
        )}
        <Link to={`/products/${id}`}>
          <h3 className="font-medium text-lg mb-2 hover:text-primary-gold transition-colors">{name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          {isSale && salePrice && (
            <>
              <span className="text-red-500 font-medium">{formatPrice(salePrice)}</span>
              <span className="text-gray-400 line-through text-sm">{formattedPrice}</span>
            </>
          )}
          {!isSale && (
            <span className="font-medium">{formattedPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;