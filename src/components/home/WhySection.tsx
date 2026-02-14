import { FaCheck } from 'react-icons/fa';
import JourneyButton from '../shared/JourneyButton';

export default function WhySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
          Why Choose Nature, Live Better? 🌿
        </h2>
        <p className="text-lg text-[#6B7280] mb-8 max-w-3xl leading-relaxed">
          Your family deserves more than hidden toxins and harmful products. At Choose Nature, Live Better, we believe in simple, God-honoring solutions that help you create a healthier, safer home.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <FaCheck className="flex-shrink-0 w-6 h-6 text-[#22C55E] mt-1" />
            <span className="text-base md:text-lg text-[#1A1A1A]">
              My mission is to guide families like yours through the transition to a toxin-free lifestyle that's simple, affordable, and rooted in God's design
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheck className="flex-shrink-0 w-6 h-6 text-[#22C55E] mt-1" />
            <span className="text-base md:text-lg text-[#1A1A1A]">
              I believe that natural living isn't just about health—it's about honoring the life and home God has blessed us with.
            </span>
          </li>
        </ul>
        <JourneyButton>Join the 3-Day Journey</JourneyButton>
        <div className="mt-12">
          <img
            src="/images/rm-green-logo.svg"
            alt="Choose Nature, Live Better"
            className="h-16 w-auto"
          />
        </div>
      </div>
    </section>
  );
}
