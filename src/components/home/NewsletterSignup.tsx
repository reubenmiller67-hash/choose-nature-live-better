import { Link } from 'react-router-dom';

export default function NewsletterSignup() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Sign Up for the 3-Day Wellness Journey
            </h2>
            <p className="text-lg text-[#6B7280] mb-8">
              Click below for three daily emails with tips, encouragement, and steps to go toxin-free.
            </p>
            <Link
              to="/lead"
              className="inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/images/rm-form-phone-img.webp"
              alt="Phone signup"
              className="max-w-xs w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
