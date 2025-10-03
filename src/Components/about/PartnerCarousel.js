"use client"
import { useState, useEffect } from "react"

export default function PartnerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const partners = [
    { 
      name: 'National Institutes of Health', 
      abbreviation: 'NIH',
      logo: '/images/partners/nih-logo.png' 
    },
    { 
      name: 'NIAID/OCICB',
      logo: '/images/partners/niaid-logo.png'
    },
    { 
      name: 'Makerere University',
      logo: '/images/partners/makerere-logo.png'
    },
    { 
      name: 'Infectious Diseases Institute',
      abbreviation: 'IDI',
      logo: '/images/partners/idi-logo.png'
    },
    { 
      name: 'CAfGEN Project',
      logo: '/images/partners/cafgen-logo.png'
    },
    { 
      name: 'RENU',
      logo: '/images/partners/renu-logo.png'
    },
    { 
      name: 'African Research Universities Alliance',
      abbreviation: 'ARUA',
      logo: '/images/partners/arua-logo.png'
    },
  ]

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % partners.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPaused, partners.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length)
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel */}
      <div className="bg-white rounded-2xl  p-12 min-h-[300px] flex items-center justify-center relative overflow-hidden">
        {/* Partner Display */}
        <div className="text-center transition-all duration-250 ease-in-out">
          {/* Logo Placeholder */}
         <div className="mb-6 flex justify-center">
            {partners[currentIndex].logo ? (
              <Image
                src={partners[currentIndex].logo}
                alt={`${partners[currentIndex].name} logo`}
                className="w-48 h-32 object-contain"
                onError={(e) => {
                  // Hide image and show placeholder on error
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.nextElementSibling;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200"
              style={{ display: partners[currentIndex].logo ? 'none' : 'flex' }}
            >
              <span className="text-4xl font-bold text-gray-400">
                {partners[currentIndex].abbreviation || partners[currentIndex].name.split(' ').map(w => w[0]).join('')}
              </span>
            </div>
          </div>
          
          {/* Partner Name */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {partners[currentIndex].name}
          </h3>
          {partners[currentIndex].abbreviation && (
            <p className="text-sm text-gray-500">
              {partners[currentIndex].abbreviation}
            </p>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all"
          aria-label="Previous partner"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all"
          aria-label="Next partner"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {partners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? 'w-8 bg-red-700'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            } h-2 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}