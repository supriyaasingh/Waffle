/**
 * Responsive WebP image from /public/images.
 * Files are generated as `<name>-640.webp` and `<name>-1280.webp`.
 */
export function Photo({
  name,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
}: {
  name: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <img
      src={`/images/${name}-1280.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1080w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      draggable={false}
    />
  )
}
