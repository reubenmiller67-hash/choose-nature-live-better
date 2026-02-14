import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNewsletterSignup } from '../../hooks/useNewsletterSignup';

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const { subscribe, isLoading, isSuccess, error } = useNewsletterSignup();

  return (
    <footer>
      {/* Section 1 - Newsletter */}
      <section className="bg-[#1E293B] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Subcribe our Newsletter
          </h3>
          <p className="text-gray-300 mb-4 max-w-xl">
            By Subscribing this form, you agree to the privacy policy and terms of use.
          </p>
          <div className="max-w-md">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent disabled:opacity-60"
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
                {isLoading ? <LoadingSpinner /> : 'Subscribe'}
              </button>
            </div>
            {isSuccess && <p className="mt-3 text-green-400 text-sm font-medium">Welcome to the journey! Check your email.</p>}
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
          </div>
          <div className="mt-4 flex gap-4">
            <Link to="/privacy-policy" className="text-[#22C55E] hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="text-[#22C55E] hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 - Main Footer */}
      <section className="bg-[#1B4332] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left - Logo & Tagline */}
            <div>
              <img
                src="/images/rm-footer-logo.svg"
                alt="Choose Nature, Live Better"
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-200 text-sm leading-relaxed">
                At Choose Nature, Live Better, we believe in simple, God-honoring solutions that help you create a healthier, safer home.
              </p>
            </div>

            {/* Middle - Nav links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-200 hover:text-[#22C55E] transition-colors">Home</Link></li>
                <li><Link to="/about-me" className="text-gray-200 hover:text-[#22C55E] transition-colors">About Me</Link></li>
                <li><Link to="/blog" className="text-gray-200 hover:text-[#22C55E] transition-colors">Blog</Link></li>
                <li><Link to="/merch" className="text-gray-200 hover:text-[#22C55E] transition-colors">Merch</Link></li>
                <li><Link to="/contact" className="text-gray-200 hover:text-[#22C55E] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Right - Additional links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-200 hover:text-[#22C55E] transition-colors">Home</Link></li>
                <li><Link to="/about-me" className="text-gray-200 hover:text-[#22C55E] transition-colors">About Me</Link></li>
                <li><Link to="/blog" className="text-gray-200 hover:text-[#22C55E] transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-200 hover:text-[#22C55E] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-center text-gray-300 text-sm mb-4">
              © Choose Nature, Live Better 2026 | All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/affiliate-disclosure" className="text-gray-300 hover:text-[#22C55E] transition-colors">
                Affiliate Disclosure
              </Link>
              <Link to="/earnings-disclaimer" className="text-gray-300 hover:text-[#22C55E] transition-colors">
                Earnings Disclaimer
              </Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-[#22C55E] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
