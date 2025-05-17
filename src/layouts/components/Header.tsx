// @ts-nocheck : JS compatible
import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

// 2. Asset imports
import Logo from '@/components/Logo'

// 3. Component imports
import { Link } from '@/components/common/Link';
import HeaderSearchBar from '@/layouts/components/HeaderSearchBar';
import ThemeModeButton from '@/components/ThemeModeButton'

function Header() {
  const [headerSearch, setHeaderSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsScrolled(window.scrollY > headerRef.current.offsetHeight);
      }
    };

    // Run once to set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setHeaderSearch(event.target.value);
  };

  return (
    <header
      ref={headerRef}
      className={`${isScrolled ? "fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" : ""} bg-card shadow-sm`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center">
          <div className="relative mr-4">
            <HeaderSearchBar redirectTo="/foods" />
          </div>
          <ThemeModeButton />
        </div>
      </div>
    </header>
  );
}

export default Header;