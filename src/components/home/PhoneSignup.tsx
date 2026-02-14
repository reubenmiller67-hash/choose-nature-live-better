import { useState } from 'react';
import { useNewsletterSignup } from '../../hooks/useNewsletterSignup';

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function PhoneSignup() {
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { subscribe, isLoading, isSuccess, error } = useNewsletterSignup();

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
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent disabled:opacity-60"
              />
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms-phone"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isLoading}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]"
                />
                <label htmlFor="terms-phone" className="text-sm text-[#6B7280]">
                  I accept the Terms & Conditions
                </label>
              </div>
              <button
                onClick={async () => {
                  setFormError(null);
                  if (!acceptTerms) {
                    setFormError('Please check the required field.');
                    return;
                  }
                  if (email && email.includes('@')) {
                    const success = await subscribe(email);
                    if (success) {
                      setEmail('');
                      setAcceptTerms(false);
                    }
                  }
                }}
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner /> : 'Subscribe'}
              </button>
              {isSuccess && <p className="text-green-600 text-sm font-medium">Welcome to the journey! Check your email.</p>}
              {(error || formError) && <p className="text-red-500 text-sm">{error || formError}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
