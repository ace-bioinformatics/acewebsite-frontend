'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MasonryPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'react-photo-album/masonry.css'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/counter.css'

export default function EventGallery({ images, title }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  if (!images?.length) return null

  const photos = images.map((img) => ({
    src: img.url,
    width: img.width || 1200,
    height: img.height || 800,
    alt: img.alt || img.caption || '',
    key: img._key,
  }))

  const slides = images.map((img) => ({
    src: img.url,
    alt: img.alt || img.caption || '',
    title: img.caption || undefined,
    description: img.credit || undefined,
    width: img.width,
    height: img.height,
  }))

  return (
    <section className="border-t border-gray-200 pt-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {title || 'Event Gallery'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {images.length} photo{images.length !== 1 ? 's' : ''} &middot; Click any image to view full screen
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-1 shrink-0">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Arrow keys or swipe to navigate
        </div>
      </div>

      {/* Masonry grid */}
      <MasonryPhotoAlbum
        photos={photos}
        columns={(w) => (w < 640 ? 1 : w < 1024 ? 2 : 3)}
        spacing={10}
        onClick={({ index }) => setLightboxIndex(index)}
        render={{
          wrapper: ({ children, style, ...rest }, { index }) => (
            <div
              {...rest}
              style={{ ...style, cursor: 'pointer' }}
              className="group relative overflow-hidden rounded-xl"
            >
              {children}
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-white/20 backdrop-blur-sm p-2.5">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              {/* Caption strip on hover */}
              {images[index]?.caption && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs line-clamp-2">{images[index].caption}</p>
                </div>
              )}
            </div>
          ),
          image: ({ src, alt, style, ...rest }) => (
            <Image
              src={src}
              alt={alt}
              style={style}
              {...rest}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder={images.find((img) => img.url === src)?.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={images.find((img) => img.url === src)?.blurDataURL || undefined}
            />
          ),
        }}
      />

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Captions, Zoom, Counter]}
        captions={{ showToggle: true, descriptionTextAlign: 'center' }}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
      />
    </section>
  )
}
