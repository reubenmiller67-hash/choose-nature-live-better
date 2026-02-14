import { useState } from 'react';
import { HiShoppingBag } from 'react-icons/hi';

export default function MerchPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Merch signup:', email);
    }
  };

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
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-[#22C55E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#16A34A] transition-colors whitespace-nowrap"
          >
            Notify Me
          </button>
        </form>
      </div>
    </section>
  );
}
