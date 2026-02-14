import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Rohit Paul',
    image: '/images/rm-testimonial-1.jpeg',
    text: 'Here is the part where you will add the testimonials from clients. The purpose of testimonials is to empower your business.',
  },
  {
    id: 2,
    name: 'Shveta',
    image: '/images/rm-testimonial-2.jpeg',
    text: 'Here is the part where you will add the testimonials from clients. The purpose of testimonials is to empower your business.',
  },
  {
    id: 3,
    name: 'Roy Linderson',
    image: '/images/rm-testimonial-3.jpeg',
    text: 'Here is the part where you will add the testimonials from clients. The purpose of testimonials is to empower your business.',
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-2">HOW IT WORKS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12">
          Proof from those who chose nature and live better
        </h2>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F0FDF4] rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
            >
              <p className="text-6xl md:text-7xl font-serif text-[#22C55E] mb-4">"</p>
              <p className="text-lg md:text-xl text-[#1A1A1A] leading-relaxed mb-8">
                {testimonials[currentIndex].text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#1B4332] overflow-hidden flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-[#1A1A1A]">{testimonials[currentIndex].name}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#22C55E] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
