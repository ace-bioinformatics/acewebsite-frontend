'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function EventHighlight({ highlights }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextHighlight = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length)
  }

  const prevHighlight = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
  }

  const goToHighlight = (index) => {
    setCurrentIndex(index)
  }

  if (!highlights || highlights.length === 0) return null

  const currentHighlight = highlights[currentIndex]

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative">
        {/* Main Highlight Display */}
        <div className="relative h-[600px] flex items-center">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.id || index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0 z-10'
                  : index < currentIndex
                  ? 'opacity-0 -translate-x-full z-0'
                  : 'opacity-0 translate-x-full z-0'
              }`}
            >
              <div className="h-full flex flex-col lg:flex-row items-center gap-8 px-6 lg:px-0">
                {/* Image Section */}
                <div
                  className={`lg:w-1/2 h-64 lg:h-full transition-all duration-1000 delay-200 ${
                    index === currentIndex && isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}
                >
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={highlight.image || '/acewebsite-frontend/images/default-event.jpg'}
                      alt={highlight.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Floating Badge */}
                    {highlight.badge && (
                      <div className="absolute top-6 left-6 animate-float">
                        <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg">
                          {highlight.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
                    index === currentIndex && isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-10'
                  }`}
                >
                  <div className="max-w-xl">
                    {/* Category */}
                    {highlight.category && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                          {highlight.category}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {highlight.title}
                    </h3>

                    {/* Date */}
                    {highlight.date && (
                      <div className="flex items-center gap-2 text-gray-600 mb-6">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="font-medium">
                          {new Date(highlight.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {highlight.description}
                    </p>

                    {/* Stats Grid */}
                    {highlight.stats && highlight.stats.length > 0 && (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {highlight.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className={`bg-white rounded-lg p-4 shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                              index === currentIndex && isVisible ? 'animate-scale-in' : ''
                            }`}
                            style={{ animationDelay: `${400 + idx * 100}ms` }}
                          >
                            <div className="text-3xl font-bold text-red-700 mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key Highlights */}
                    {highlight.keyPoints && highlight.keyPoints.length > 0 && (
                      <div className="space-y-3">
                        {highlight.keyPoints.map((point, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start gap-3 transition-all duration-500 ${
                              index === currentIndex && isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-4'
                            }`}
                            style={{ transitionDelay: `${600 + idx * 100}ms` }}
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                              <svg className="w-4 h-4 text-red-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                            <span className="text-gray-700">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {highlights.length > 1 && (
          <>
            {/* Arrow Buttons */}
            <div className="absolute top-1/2 left-4 lg:left-8 -translate-y-1/2 z-20">
              <button
                onClick={prevHighlight}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-red-50 hover:text-red-700 transition-all hover:scale-110"
                aria-label="Previous highlight"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 right-4 lg:right-8 -translate-y-1/2 z-20">
              <button
                onClick={nextHighlight}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-red-50 hover:text-red-700 transition-all hover:scale-110"
                aria-label="Next highlight"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToHighlight(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-red-600 rounded-full'
                      : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-red-400'
                  }`}
                  aria-label={`Go to highlight ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
