import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const carouselData = [
  { image: '/images/rb-hero-1.webp', label: 'Family' },
  { image: '/images/rm-image-1.webp', label: 'Nature' },
  { image: '/images/rm-image-2.webp', label: 'Free' },
  { image: '/images/rm-image-3.webp', label: 'Nature' },
  { image: '/images/rm-image-4.webp', label: 'Safe' },
  { image: '/images/rb-hero-1.webp', label: 'Family' },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 280;
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % carouselData.length);

  return (
    <section className="py-16 md:py-24 bg-[#F0FDF4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {carouselData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-center"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] bg-[#1B4332] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="py-4 text-center font-semibold text-[#1A1A1A]">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
