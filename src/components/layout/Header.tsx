import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt2, HiOutlineUser, HiOutlineShoppingCart } from 'react-icons/hi';
import { IoGridOutline } from 'react-icons/io5';
import MobileMenu from './MobileMenu';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about-me', label: 'About' },
  { path: '/blog', label: 'Blog' },
  { path: '/merch', label: 'Merch' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left - Mobile menu / Grid icon */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt2 className="h-6 w-6 text-[#1A1A1A]" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:block"
                aria-label="Menu"
              >
                <IoGridOutline className="h-6 w-6 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
              <img
                src="/images/rb-header-logo.svg"
                alt="Choose Nature, Live Better"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Right - Account & Cart */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Account"
              >
                <HiOutlineUser className="h-6 w-6 text-[#1A1A1A]" />
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Shopping cart"
              >
                <HiOutlineShoppingCart className="h-6 w-6 text-[#1A1A1A]" />
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 pb-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    isActive ? 'text-[#22C55E]' : 'text-[#1A1A1A] hover:text-[#22C55E]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
