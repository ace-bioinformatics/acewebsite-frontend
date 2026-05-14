'use client'
import { useEffect, useRef, useState } from 'react'

const VARIANTS = {
  'fade-up':    'opacity-0 translate-y-8',
  'fade-in':    'opacity-0',
  'fade-left':  'opacity-0 -translate-x-8',
  'fade-right': 'opacity-0 translate-x-8',
  'zoom':       'opacity-0 scale-95',
}

export default function AnimateOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 650,
  className = '',
  as: Tag = 'div',
  threshold = 0.12,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const hidden = VARIANTS[variant] ?? VARIANTS['fade-up']

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out ${visible ? '' : hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </Tag>
  )
}
