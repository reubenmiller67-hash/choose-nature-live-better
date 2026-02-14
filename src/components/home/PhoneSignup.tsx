import { useState } from 'react';

export default function PhoneSignup() {
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!acceptTerms) {
      setError('Please check the required field.');
      return;
    }
    // TODO: Connect to Firebase
    console.log('Newsletter signup:', { email });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <img
              src="/images/rm-form-phone-img.webp"
              alt="Phone signup screen"
              className="max-w-xs w-full object-contain"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Sign Up for the 3-Day Wellness Journey
            </h2>
            <p className="text-lg text-[#6B7280] mb-8">
              Click below for three daily emails with tips, encouragement, and steps to go toxin-free.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
              />
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]"
                />
                <label htmlFor="terms" className="text-sm text-[#6B7280]">
                  I accept the Terms & Conditions
                </label>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
