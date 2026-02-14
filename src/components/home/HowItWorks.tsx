import { HiCube } from 'react-icons/hi';

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-[#FEFCE8]">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-2">HOW IT WORKS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-6">
          A Simple, Faith Centered Path to Wellness
        </h2>
        <p className="text-lg text-[#6B7280] mb-8 max-w-3xl">
          Discover affordable, natural products. Each email helps you make simple, affordable swaps in personal care, cleaning, and wellness.
        </p>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <HiCube className="w-8 h-8 text-[#22C55E]" />
            <h3 className="text-xl font-bold text-[#1A1A1A]">Affordable Wellness</h3>
          </div>
          <p className="text-[#6B7280]">Budget-friendly natural products</p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[300px] bg-[#1B4332]">
            <img
              src="/images/rm-image-3.webp"
              alt="Wellness"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B4332] flex items-center justify-center p-8">
            <img
              src="/images/rm-text-bg.png"
              alt="Build a God-Honoring Lifestyle"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B4332]">
            <img src="/images/rm-image-2.webp" alt="Nature" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B4332]">
            <img src="/images/rm-image-6.webp" alt="God Is Faithful" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B4332]">
            <img src="/images/rm-image-5.webp" alt="Family" className="w-full h-full object-cover" />
          </div>
        </div>

        <p className="text-base md:text-lg text-[#6B7280] max-w-3xl leading-relaxed">
          By the end of the series, you'll feel confident creating sustainable habits and enjoy the support of our faith-based community to keep you on track.
        </p>
      </div>
    </section>
  );
}
