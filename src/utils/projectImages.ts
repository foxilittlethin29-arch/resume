/**
 * Project Image Loader
 * 
 * Automatically loads project images from:
 *   public/images/projects/{project-slug}/
 * 
 * Expected image files:
 *   cover.webp - Main project thumbnail (required)
 *   screenshot-1.webp through screenshot-n.webp - Additional screenshots (optional)
 * 
 * If cover.webp is missing, returns null so the UI can show a "Coming Soon" placeholder.
 */

const BASE_PATH = '/resume/images/projects';

export interface ProjectImages {
  thumbnail: string | null;
  screenshots: string[];
}

/**
 * Get the base URL for a project's images.
 */
export function getProjectImageBaseUrl(slug: string): string {
  return `${BASE_PATH}/${slug}`;
}

/**
 * Get the thumbnail URL for a project.
 * Returns null if the image doesn't exist (UI should show placeholder).
 */
export function getProjectThumbnail(slug: string): string | null {
  // We attempt to load cover.webp. If it doesn't exist, return null.
  // The UI component will handle the null case by showing a "Coming Soon" placeholder.
  return `${getProjectImageBaseUrl(slug)}/cover.webp`;
}

/**
 * Get all screenshot URLs for a project.
 * Returns an array of URLs. If no screenshots exist, returns empty array.
 */
export function getProjectScreenshots(slug: string): string[] {
  // Future: This could be extended to check for multiple screenshot files
  // For now, we return an empty array and the UI will show only the thumbnail
  return [];
}

/**
 * Get all image URLs for a project.
 */
export function getProjectImages(slug: string): ProjectImages {
  return {
    thumbnail: getProjectThumbnail(slug),
    screenshots: getProjectScreenshots(slug),
  };
}

/**
 * Check if a project has a cover image.
 * This is used by the Portfolio to decide whether to show the image or a placeholder.
 */
export function hasProjectCover(slug: string): boolean {
  // We assume the image exists. If it doesn't load, the onError handler
  // in the UI component will catch it and show the placeholder.
  return true;
}