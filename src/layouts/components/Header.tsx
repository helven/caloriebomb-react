// @ts-nocheck : JS compatible
import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

import Logo from '@/components/Logo'
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
        <a className="flex items-center" href="/">
          <Logo />
        </a>
        <div className="flex items-center">
          <div className="relative mr-4">
            <HeaderSearchBar />
          </div>
          <ThemeModeButton />
        </div>
      </div>
    </header>
  );
}

export default Header;