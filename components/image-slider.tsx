"use client"

import { useState, useEffect } from "react"

interface ImageSliderProps {
  images: Array<{ before: string; after: string; alt?: string }>
  autoPlay?: boolean
}

const ChevronLeft = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function ImageSlider({ images, autoPlay = true }: ImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const [showBefore, setShowBefore] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [images.length, autoPlay])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  if (images.length === 0) return null

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI_Generated-ItJtgdHrslSI9VKRzgMAQE8gC2UOSk.jpeg"
          alt={images[current].alt || "Slider image"}
          className="w-full h-full object-cover"
        />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${idx === current ? "bg-primary w-8" : "bg-border w-2"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
