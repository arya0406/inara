import { useEffect, useState } from 'react';
import { preloadCriticalImages, checkImageExists } from '../../utils/imageUtils';

interface ImageLoadStatus {
  loaded: boolean;
  error: boolean;
  path: string;
}

/**
 * Component that preloads critical images and provides visual feedback
 */
const ImagePreloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageStatuses, setImageStatuses] = useState<ImageLoadStatus[]>([]);
  
  useEffect(() => {
    let mounted = true;

    const validateAndPreloadImages = async () => {
      const statuses: ImageLoadStatus[] = [];
      
      // Test critical images first
      const criticalImages = [
        '/images/products/rings-set-1.jpg',
        '/images/products/ring-1.jpg',
        '/images/products/pendant-1.jpg',
        '/images/products/necklace-1.jpg',
        '/images/hero/hero-1.jpg',
        '/images/products/bracelets/IMG-20250512-WA0038.jpg' // Replaced Logo.png with a bracelet image
      ];
      
      for (const path of criticalImages) {
        const exists = await checkImageExists(path);
        if (mounted) {
          statuses.push({ path, loaded: exists, error: !exists });
          
          if (!exists) {
            console.error(`Critical image not found: ${path}`);
          }
        }
      }
      
      // Validate bracelet images up to WA0050 (known good range)
      for (let i = 37; i <= 50; i++) {
        const path = `/images/products/bracelets/IMG-20250512-WA00${i}.jpg`;
        const exists = await checkImageExists(path);
        if (mounted) {
          statuses.push({ path, loaded: exists, error: !exists });
        }
      }
      
      if (mounted) {
        setImageStatuses(statuses);
        
        // Preload successfully validated images
        preloadCriticalImages();
        
        // Give a small delay to ensure UI is smooth
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        // Log summary of available images
        const availableImages = statuses.filter(s => s.loaded).length;
        console.log(`Image preloader: Found ${availableImages} of ${statuses.length} critical images`);
      }
    };
    
    // Start validation process
    validateAndPreloadImages();
    
    // Cleanup
    return () => {
      mounted = false;
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-primary-ivory/90 z-50 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="text-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading essential images...</p>
        </div>
        
        {/* Optional loading details */}
        <div className="space-y-2 max-h-48 overflow-auto">
          {imageStatuses.filter(status => status.error).map(status => (
            <div key={status.path} className="text-xs text-red-500">
              Failed to load: {status.path}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePreloader;
