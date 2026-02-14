import { Link } from 'react-router-dom';
import LeadForm from '../components/lead/LeadForm';

export default function LeadPage() {
  return (
    <>
      {/* Hero banner */}
      <div className="relative h-48 md:h-64 bg-[#1B4332] overflow-hidden">
        <img
          src="/images/rm-banner-1.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-end pb-6">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="text-sm text-white/80">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <span>Landingpage Lead Magnet</span>
            </nav>
          </div>
        </div>
      </div>

      <LeadForm />
    </>
  );
}
