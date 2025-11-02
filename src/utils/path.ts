/**
 * Get the correct asset path with base URL
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Combine with base URL
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
