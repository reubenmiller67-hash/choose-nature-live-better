import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useNewsletterSignup } from '../../hooks/useNewsletterSignup';

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { subscribe, isLoading, isSuccess, error } = useNewsletterSignup();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          Thank you for joining the 3-day wellness journey
        </h1>
        <p className="text-lg text-[#6B7280] mb-8">
          Click below for three daily emails with tips, encouragement, and steps to go toxin-free.
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent disabled:opacity-60"
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]"
            />
            <label htmlFor="terms" className="text-sm text-[#6B7280]">
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>
          <button
            onClick={async () => {
              setFormError(null);
              if (!name.trim()) {
                setFormError('Please enter your name.');
                return;
              }
              if (!acceptTerms) {
                setFormError('Please agree to the Terms of Use and Privacy Policy.');
                return;
              }
              if (email && email.includes('@')) {
                const success = await subscribe(email);
                if (success) {
                  setName('');
                  setEmail('');
                  setAcceptTerms(false);
                }
              }
            }}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#22C55E] text-white rounded-full px-8 py-5 text-xl font-semibold hover:bg-[#16A34A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoadingSpinner /> : 'Sign Up Now'}
          </button>
          {isSuccess && <p className="text-green-600 text-sm font-medium">Welcome to the journey! Check your email.</p>}
          {(error || formError) && <p className="text-red-500 text-sm">{error || formError}</p>}
        </div>

        <div className="mt-12 space-y-4">
          <div className="flex items-start gap-3">
            <FaCheck className="flex-shrink-0 w-6 h-6 text-[#22C55E] mt-1" />
            <p className="text-[#1A1A1A]">
              My mission is to guide families like yours through the transition to a toxin-free lifestyle.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FaCheck className="flex-shrink-0 w-6 h-6 text-[#22C55E] mt-1" />
            <p className="text-[#1A1A1A]">
              Simple, affordable, and rooted in God's design.
            </p>
          </div>
        </div>

        <Link
          to="/lead"
          className="mt-8 inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors"
        >
          Join the 3-Day Journey
        </Link>

        <div className="mt-12 flex justify-center">
          <img src="/images/rm-green-logo.svg" alt="Choose Nature, Live Better" className="h-16 w-auto" />
        </div>
      </div>
    </section>
  );
}
