import { useState, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { getValidImagePath, getCategoryFallbackImage } from '../../utils/imageUtils';
import LoadingSpinner from './LoadingSpinner';
import '../styles/ImageStyles.css';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  category?: string;
  productId?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  category,
  productId,
  width,
  height,
  aspectRatio = '1/1',
  objectFit = 'cover'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxAttempts = 2;

  const loadImage = useCallback((imagePath: string) => {
    if (!imagePath) {
      console.error('No image path provided');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    let timeoutId: number;
    
    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      cleanup();
      setCurrentSrc(imagePath);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = (_event: Event | string) => {
      cleanup();
      console.error('Image failed to load:', { src: imagePath });
      
      if (loadAttempts < maxAttempts) {
        // Try loading fallback image
        setLoadAttempts(prev => prev + 1);
        const fallbackSrc = getCategoryFallbackImage(category);
        if (fallbackSrc && fallbackSrc !== imagePath) {
          loadImage(fallbackSrc);
          return;
        }
      }
      
      setHasError(true);
      setIsLoading(false);
    };

    // Set timeout to handle very slow loading images
    timeoutId = window.setTimeout(() => {
      if (img.complete) return;
      console.warn('Image load timeout:', imagePath);
      img.onerror?.(new Event('timeout'));
    }, 10000); // 10 second timeout

    img.src = imagePath;
    
    return cleanup;
  }, [category, loadAttempts, maxAttempts]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    const validPath = getValidImagePath(src, productId);
    const cleanup = loadImage(validPath);
    
    return () => {
      cleanup?.();
    };
  }, [src, productId, loadImage]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: width || '100%',
    height: height || 'auto',
    aspectRatio: aspectRatio,
    ...style
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    opacity: isLoading ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  };
  
  return (
    <div className={`image-container ${className}`} style={containerStyle}>
      {isLoading && (
        <div className="image-loading-overlay">
          <LoadingSpinner />
        </div>
      )}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          style={imageStyle}
          className={`safe-image ${hasError ? 'image-error' : ''}`}
        />
      )}
      {hasError && !isLoading && (
        <div className="image-error-overlay">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default SafeImage;
