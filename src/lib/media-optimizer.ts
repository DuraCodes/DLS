/**
 * Smart Media Optimization Utilities for DLORENZ SOLUTIONS
 * Automatically handles:
 * - ImageKit URL parameter injection (f-auto, q-auto, resolution bounds)
 * - Automatic poster generation for videos
 * - Device viewport adaptive sizing
 */

export interface MediaTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'mp4' | 'webm' | 'jpg';
  crop?: 'maintain_ratio' | 'force' | 'at_least';
}

/**
 * Optimizes an image or video URL through ImageKit or Unsplash
 */
export function getOptimizedMediaUrl(url: string, options: MediaTransformOptions = {}): string {
  if (!url) return '';

  const isImageKit = url.includes('ik.imagekit.io');
  const isUnsplash = url.includes('images.unsplash.com');

  if (isImageKit) {
    // If it already contains ImageKit transformations, parse and append cleanly
    const width = options.width || (typeof window !== 'undefined' && window.innerWidth < 768 ? 720 : 1280);
    const quality = options.quality || (typeof window !== 'undefined' && window.innerWidth < 768 ? 65 : 75);
    const format = options.format || 'auto';

    const trParams = `tr=f-${format},q-${quality},w-${width}`;

    if (url.includes('?')) {
      // Check if `tr=` is already present
      if (url.includes('tr=')) {
        return url;
      }
      return `${url}&${trParams}`;
    }
    return `${url}?${trParams}`;
  }

  if (isUnsplash) {
    const width = options.width || (typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 1400);
    const quality = options.quality || 80;
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      parsed.searchParams.set('w', width.toString());
      parsed.searchParams.set('q', quality.toString());
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return url;
}

/**
 * Generates an instantaneous first-frame poster image URL from an ImageKit video URL
 */
export function getVideoPosterUrl(videoUrl: string, fallbackWidth = 800): string {
  if (!videoUrl) return '';

  if (videoUrl.includes('ik.imagekit.io')) {
    // ImageKit thumbnail extraction from frame 0
    const trParams = `tr=so-0,f-webp,q-70,w-${fallbackWidth}`;
    if (videoUrl.includes('?')) {
      return `${videoUrl}&${trParams}`;
    }
    return `${videoUrl}?${trParams}`;
  }

  return '';
}

/**
 * Checks if the current client device has touch capability (mobile / tablet)
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
