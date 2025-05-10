// @ts-nocheck : JS compatible
import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

import Logo from '@/components/Logo'
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
          <h1 className="text-2xl font-bold text-primary">CalorieBomb</h1><span className="text-xl ml-1">💣</span>
        </a>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              value={headerSearch}
              onChange={handleHeaderSearch}
              placeholder="Search for foods..."
              className="pl-3 pr-10 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-64"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Logo />
            </div>
          </div>
          <ThemeModeButton />
        </div>
      </div>
    </header>
  );
}

export default Header;