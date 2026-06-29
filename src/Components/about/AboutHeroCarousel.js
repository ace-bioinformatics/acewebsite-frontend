'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AboutHeroCarousel({ images }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images])

  if (!images || images.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => (
        <Image
          key={img._key || i}
          src={img.url}
          alt={img.alt || ''}
          fill
          priority={i === 0}
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gray-900/65" />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
