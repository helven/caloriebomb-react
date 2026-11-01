// @ts-nocheck : JS compatible
import { useEffect, useRef, useState } from 'react';

// 2. Asset imports
import Logo from '@/components/Logo';

// 3. Component imports
import { Link } from '@/components/common/Link';
import MainNavigation from '@/components/MainNavigation';
import MobileNavigation from '@/components/MobileNavigation';
import ThemeModeButton from '@/components/ThemeModeButton';
import HeaderSearchBar from '@/layouts/components/HeaderSearchBar';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) {
        return;
      }

      setIsScrolled(window.scrollY > headerRef.current.offsetHeight);
    };

    // Run once to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${isScrolled ? 'fixed left-0 right-0 top-0 z-50 backdrop-blur-sm' : ''} bg-card1 shadow-sm`}
    >
      <div className="container mx-auto grid grid-cols-1 items-center justify-items-center px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch">
        <MobileNavigation className="absolute left-4 top-4" />

        <Link href="/" className="md:justify-self-start">
          <Logo />
        </Link>

        <div className="hidden items-center md:flex md:justify-self-center">
          <MainNavigation className="hidden gap-4 md:flex" />
        </div>

        <div className="mt-3 flex items-center gap-4 md:mt-0 md:justify-self-end">
          <div className="relative">
            <HeaderSearchBar redirectTo="/foods" />
          </div>
          <ThemeModeButton className="hidden md:flex" />
        </div>
      </div>
    </header>
  );
}

export default Header;
