import { Link } from 'react-router-dom';

export default function AboutHero() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-4">About Me</p>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              Hi, I'm Reuben, and I know how overwhelming it can feel to make healthier choices for your family. That's why I created Choose Nature, Live Better.
            </h1>
            <Link
              to="/about-me"
              className="inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors mb-8"
            >
              Learn More
            </Link>
            <p className="text-[#22C55E] text-lg md:text-xl font-medium italic max-w-2xl">
              As a father, I know how important it is to create a safe, nurturing home that reflects our faith and values.
            </p>
          </div>
          <div>
            <img
              src="/images/rb-reuben-1.webp"
              alt="Reuben - Choose Nature, Live Better"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-xl object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
