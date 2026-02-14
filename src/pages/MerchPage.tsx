import { useState } from 'react';
import { HiShoppingBag } from 'react-icons/hi';
import { useNewsletterSignup } from '../hooks/useNewsletterSignup';

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function MerchPage() {
  const [email, setEmail] = useState('');
  const { subscribe, isLoading, isSuccess, error } = useNewsletterSignup();

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <HiShoppingBag className="w-12 h-12 text-[#22C55E]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          Our merch store is coming soon!
        </h1>
        <p className="text-lg text-[#6B7280] mb-8">
          We're working on bringing you faith-based natural wellness merchandise. Sign up to be notified when we launch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent disabled:opacity-60"
          />
          <button
            onClick={async () => {
              if (email && email.includes('@')) {
                const success = await subscribe(email);
                if (success) setEmail('');
              }
            }}
            disabled={isLoading}
            className="bg-[#22C55E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#16A34A] transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoadingSpinner /> : 'Notify Me'}
          </button>
        </div>
        {isSuccess && <p className="mt-4 text-green-600 text-sm font-medium">Welcome to the journey! Check your email.</p>}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </section>
  );
}
