import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#1B4332] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/rm-banner-1.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <p className="text-sm uppercase tracking-wider text-white/80 mb-2">TAKE ACTION</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Take the First Step Toward a Healthier Home
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl">
          It's time to detox your home, nurture your family, and align your life with God's plan. Join the 3-Day Wellness Journey today and learn how to create a home filled with health, harmony, and faith.
        </p>
        <Link
          to="/lead"
          className="inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-10 py-5 text-xl font-semibold hover:bg-[#16A34A] transition-colors"
        >
          Start Your Journey Now
        </Link>
      </div>
    </section>
  );
}
