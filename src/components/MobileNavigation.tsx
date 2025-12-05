// 1. React and React ecosystem imports
import { useState } from 'react';

// 2. Asset imports

// 3. Component imports
import MainNavigation from '@/components/MainNavigation';



interface Props {
  className?: string,
}

function MobileNavigation({ className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${className} md:hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2 md:hidden"
        aria-label="Toggle menu"
      >
        <span className={`h-0.5 w-6 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`h-0.5 w-6 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`h-0.5 w-6 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <nav 
            className="absolute left-0 top-0 h-full w-64 bg-card1 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <MainNavigation 
              className="flex flex-col gap-4 p-6" 
              onLinkClick={() => setIsOpen(false)} 
            />
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNavigation;
