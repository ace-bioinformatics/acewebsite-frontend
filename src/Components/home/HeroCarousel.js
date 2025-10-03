'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export default function HeroCarousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-[600px] bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to ACE Uganda</h1>
          <p className="text-xl">African Center of Excellence in Bioinformatics & Data-intensive Sciences</p>
        </div>
      </div>
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      vr: 'bg-purple-600',
      hpc: 'bg-blue-600',
      research: 'bg-red-600',
      training: 'bg-emerald-600',
      announcement: 'bg-amber-600',
      partnership: 'bg-indigo-600',
    }
    return colors[category] || 'bg-red-600'
  }

  return (
    <div className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={urlFor(slide.image).width(1920).height(1080).url()}
              alt={slide.image.alt || slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                {/* Category Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center rounded-full ${getCategoryColor(slide.category)} px-4 py-2 text-sm font-semibold text-white`}>
                    {slide.category === 'vr' && '🥽 VR Lab'}
                    {slide.category === 'hpc' && '💻 HPC Cluster'}
                    {slide.category === 'research' && '🔬 Research'}
                    {slide.category === 'training' && '🎓 Training'}
                    {slide.category === 'announcement' && '📢 Announcement'}
                    {slide.category === 'partnership' && '🤝 Partnership'}
                  </span>
                </div>

                {/* Subtitle */}
                {slide.subtitle && (
                  <p className="text-red-400 text-lg font-medium mb-3 animate-fade-in">
                    {slide.subtitle}
                  </p>
                )}

                {/* Title */}
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div className="flex gap-4 animate-slide-up">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-all hover:scale-105"
                  >
                    {slide.ctaText || 'Learn More'}
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-md bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white hover:bg-white/30 transition-all"
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white hover:bg-white/30 transition-all"
            aria-label="Next slide"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-red-600' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-8 right-8 z-20 rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  )
}