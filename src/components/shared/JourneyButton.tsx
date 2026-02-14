import { Link } from 'react-router-dom';

interface JourneyButtonProps {
  to?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export default function JourneyButton({ 
  to = '/lead', 
  children, 
  variant = 'primary',
  className = '',
  onClick 
}: JourneyButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold text-lg transition-all duration-300';
  const primaryClasses = 'bg-[#22C55E] text-white px-8 py-4 hover:bg-[#16A34A]';
  const secondaryClasses = 'border-2 border-[#22C55E] text-[#22C55E] px-8 py-4 hover:bg-green-50';

  const buttonClasses = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={buttonClasses}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={buttonClasses}>
      {children}
    </Link>
  );
}
