import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6">
              Families Seeking a Healthier, God-Honoring Life
            </h1>
            <p className="text-lg md:text-xl text-[#6B7280] mb-8 leading-relaxed">
              Ready to detox your home and align your family's well-being with God's design? Start our 3-Day Wellness Journey today and discover how simple, affordable changes can make a lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/lead"
                className="inline-flex items-center justify-center border-2 border-[#22C55E] text-[#22C55E] rounded-full px-8 py-4 text-lg font-semibold hover:bg-green-50 transition-colors text-center"
              >
                Watch Video
              </Link>
              <Link
                to="/lead"
                className="inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors text-center"
              >
                Start Now
              </Link>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <img
              src="/images/rb-reuben-1.webp"
              alt="Reuben - Choose Nature, Live Better"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-xl object-cover aspect-[4/5]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling;
                if (placeholder) (placeholder as HTMLElement).style.display = 'block';
              }}
            />
            <div
              className="hidden w-full max-w-lg mx-auto rounded-2xl shadow-xl aspect-[4/5] bg-[#1B4332]"
              style={{ display: 'none' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
