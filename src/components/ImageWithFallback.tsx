import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackText = "준비중입니다"
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  if (imageError) {
    return (
      <div className={`${className} bg-zinc-800 flex items-center justify-center`}>
        <div className="text-center p-8">
          <div className="text-white/40 text-4xl mb-4">📷</div>
          <p className="text-white/60 text-sm">{fallbackText}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {!imageLoaded && (
        <div className={`${className} bg-zinc-800 animate-pulse`}></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${!imageLoaded ? 'hidden' : ''}`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  )
}
