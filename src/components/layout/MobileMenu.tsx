import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about-me', label: 'About' },
  { path: '/blog', label: 'Blog' },
  { path: '/merch', label: 'Merch' },
  { path: '/contact', label: 'Contact' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Fragment key="mobile-menu">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 flex flex-col lg:hidden"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={`w-full text-center py-4 px-6 rounded-lg text-xl font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#F0FDF4] border-l-4 border-[#22C55E] text-[#1B4332]' 
                        : 'text-[#1A1A1A] hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user && (
                <Link
                  to="/admin/dashboard"
                  onClick={onClose}
                  className="w-full text-center py-3 px-6 rounded-lg text-base font-medium text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/lead"
                onClick={onClose}
                className="mt-8 w-full max-w-xs inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-[#16A34A] transition-colors"
              >
                Join Membership
              </Link>
            </nav>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
