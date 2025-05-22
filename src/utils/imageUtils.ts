// Safe bracelet image paths that we know exist and work reliably
const SAFE_BRACELET_IMAGES = [
  '/images/products/bracelets/IMG-20250512-WA0037.jpg',
  '/images/products/bracelets/IMG-20250512-WA0038.jpg',
  '/images/products/bracelets/IMG-20250512-WA0039.jpg',
  '/images/products/bracelets/IMG-20250512-WA0040.jpg',
  '/images/products/bracelets/IMG-20250512-WA0041.jpg',
  '/images/products/bracelets/IMG-20250512-WA0042.jpg',
  '/images/products/bracelets/IMG-20250512-WA0043.jpg',
  '/images/products/bracelets/IMG-20250512-WA0044.jpg',
  '/images/products/bracelets/IMG-20250512-WA0045.jpg',
  '/images/products/bracelets/IMG-20250512-WA0046.jpg',
  '/images/products/bracelets/IMG-20250512-WA0047.jpg',
  '/images/products/bracelets/IMG-20250512-WA0048.jpg',
  '/images/products/bracelets/IMG-20250512-WA0049.jpg',
  '/images/products/bracelets/IMG-20250512-WA0050.jpg'
];

// Array of critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/images/products/rings-set-1.jpg',
  '/images/products/ring-1.jpg', 
  '/images/products/pendant-1.jpg',
  '/images/products/necklace-1.jpg',
  '/images/hero/hero-1.jpg',
  '/images/products/bracelets/IMG-20250512-WA0038.jpg' // Replaced Logo.png
];

// List of known problematic image patterns 
const PROBLEM_IMAGE_PATTERNS = [
  'undefined',
  'null',
  '[object Object]',
  '.pdf-image-', // Only block specific PDF image patterns that are known to be problematic
  'IMG-20250512-WA008', // Images with numbers above 82
  'data:', // Data URLs are not allowed
  '//', // Double slashes (except in http://)
  '..', // Directory traversal attempts
];

/**
 * Preloads critical images to ensure they're in the browser cache
 */
export const preloadCriticalImages = () => {
  CRITICAL_IMAGES.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

/**
 * Checks if an image exists by loading it
 */
export const checkImageExists = async (src: string): Promise<boolean> => {
  if (!src) return false;
  
  // Normalize the path
  const path = src.startsWith('http') ? src : getValidImagePath(src);
  
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Image load timeout'));
      }, 5000); // 5 second timeout
      
      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      
      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error('Image load failed'));
      };
      
      img.src = path;
    });
    console.debug(`Image exists: ${path}`);
    return true;
  } catch (error) {
    console.warn(`Image check failed for ${path}:`, error);
    return false;
  }
};

/**
 * Get a category-specific fallback image
 */
export const getCategoryFallbackImage = (category?: string, productId?: string) => {
  // For bracelets, use different fallback images based on product ID for variety
  if (category?.toLowerCase() === 'bracelets' && productId) {
    const numericId = parseInt(productId) || 0;
    const index = Math.abs(numericId) % SAFE_BRACELET_IMAGES.length;
    return SAFE_BRACELET_IMAGES[index];
  }
  
  switch (category?.toLowerCase()) {
    case 'bracelets':
      return SAFE_BRACELET_IMAGES[0]; // Use first safe bracelet image as default
    case 'necklaces':
      return '/images/products/necklace-1.jpg';
    case 'rings':
      return '/images/products/ring-1.jpg';
    case 'earrings':
      return '/images/products/pendant-1.jpg';
    default:
      return '/images/products/bracelets/IMG-20250512-WA0038.jpg'; // Replaced Logo.png
  }
};

/**
 * Get a fallback image for non-product images
 */
export const getFallbackImage = (type: 'hero' | 'collection' | 'profile' | 'banner' | 'general' = 'general') => {
  switch (type) {
    case 'hero':
      return '/images/hero/hero-1.jpg';
    case 'collection':
      return '/images/products/necklace-1.jpg';
    case 'profile':
      return '/images/products/bracelets/IMG-20250512-WA0042.jpg'; // Replaced Logo.png
    case 'banner':
      return '/images/products/rings-set-1.jpg';
    case 'general':
    default:
      return '/images/products/bracelets/IMG-20250512-WA0045.jpg'; // Replaced Logo.png
  }
};

/**
 * Handle image loading errors globally
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = event.currentTarget;
  
  // Add error class for styling
  target.classList.add('image-error');
  
  // Get category and product info from data attributes
  const category = target.getAttribute('data-category') || undefined;
  const productId = target.getAttribute('data-product-id') || undefined;
  
  // Apply appropriate fallback
  target.src = getCategoryFallbackImage(category, productId);

  // Log error for tracking
  console.warn(`Image load failed for: ${target.src}, using fallback for ${category || 'unknown category'}`);
};

/**
 * Ensure image path is valid, with proper fallbacks
 */
export const getValidImagePath = (path: string | undefined, category?: string, productId?: string) => {
  // Handle undefined/empty paths
  if (!path) {
    const fallback = getCategoryFallbackImage(category, productId);
    console.debug(`Empty path provided, using fallback: ${fallback}`);
    return fallback;
  }
  
  // Don't modify absolute URLs
  if (path.startsWith('http')) {
    return path;
  }
  
  try {
    // Clean and normalize the path
    let normalizedPath = path.replace(/\\/g, '/'); // Convert Windows backslashes
    normalizedPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    
    // Remove any double slashes (except http://)
    normalizedPath = normalizedPath.replace(/([^:])\/+/g, '$1/');
    
    // Check for known problematic patterns
    const isProbablyBad = PROBLEM_IMAGE_PATTERNS.some(pattern => 
      normalizedPath.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (isProbablyBad) {
      console.warn(`Detected problematic image pattern in path: ${path}`);
      return getCategoryFallbackImage(category, productId);
    }
    
    // Special handling for bracelet images
    if (category?.toLowerCase() === 'bracelets') {
      const braceletPath = normalizedPath.replace(/^\/+/, '');
      const safePath = SAFE_BRACELET_IMAGES.find(safe => 
        safe.endsWith(braceletPath) || braceletPath.endsWith(safe.slice(1))
      );
      if (safePath) {
        console.debug(`Using safe bracelet image: ${safePath}`);
        return safePath;
      }
    }
    
    // Log the final path for debugging
    console.debug(`Image path normalized: ${normalizedPath}`);
    
    // Handle paths differently in development and production
    if (process.env.NODE_ENV === 'development') {
      return normalizedPath; // Keep the leading slash in development
    } else {
      // In production, remove the leading slash as assets are served from the root
      return normalizedPath.replace(/^\//, '');
    }
  } catch (error) {
    console.error(`Error processing image path: ${path}`, error);
    return getCategoryFallbackImage(category, productId);
  }
};
