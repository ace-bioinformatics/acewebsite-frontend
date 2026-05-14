'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function EventGallery({ photos }) {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(() => setActive(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setActive(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, prev, next])

  if (!photos?.length) return null

  return (
    <>
      {/* ── Masonry-style grid ── */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 space-y-2">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Image
              src={photo.url}
              alt={photo.caption || `Event photo ${idx + 1}`}
              width={photo.dimensions?.width || 800}
              height={photo.dimensions?.height || 600}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* hover overlay */}
            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
            {/* zoom icon */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            {/* caption strip */}
            {photo.caption && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs line-clamp-2">{photo.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={close}
        >
          {/* close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/25 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
            {active + 1} / {photos.length}
          </span>

          {/* image */}
          <div
            className="relative flex flex-col items-center px-16 max-w-6xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[80vh] flex items-center justify-center">
              <Image
                src={photos[active].url}
                alt={photos[active].caption || `Photo ${active + 1}`}
                width={photos[active].dimensions?.width || 1200}
                height={photos[active].dimensions?.height || 800}
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                priority
              />
            </div>
            {photos[active].caption && (
              <p className="mt-4 text-center text-white/70 text-sm px-4">
                {photos[active].caption}
              </p>
            )}
          </div>

          {/* prev / next */}
          {photos.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
                aria-label="Previous photo"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
                aria-label="Next photo"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* thumbnail strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 px-4 max-w-[90vw] overflow-x-auto pb-1">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActive(i) }}
                  className={`relative h-12 w-12 shrink-0 overflow-hidden rounded transition-all ${
                    i === active ? 'ring-2 ring-red-500 opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                >
                  <Image src={p.url} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
