/**
 * Preloads one or more images
 * @param {string|string[]} images - Image URL or array of image URLs to preload
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (images) => {
  const imageArray = Array.isArray(images) ? images : [images];
  
  const promises = imageArray.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ src, status: 'loaded' });
      img.onerror = () => reject({ src, status: 'error' });
      img.src = src;
    });
  });
  
  return Promise.all(promises);
};

/**
 * List of critical images to preload on initial app load
 */
export const CRITICAL_IMAGES = [
  '/cofee-image-homepage.svg',
  '/coffeeHouse.svg'
];

/**
 * Preloads all critical images at once
 */
export const preloadCriticalImages = () => {
  return preloadImages(CRITICAL_IMAGES);
}; 