// @ts-nocheck : JS compatible
import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom'

//import { useTheme } from "@/hooks/useTheme";
import { Link } from '@/components/common/Link';
import useAppStore from '@/stores/useAppStore'
import Header from '@/layouts/components/Header'
import Logo from '@/components/Logo'

function MainLayout({ children }) {
  //const theme = useTheme();
  const { initApp, themeMode } = useAppStore();

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <Header />
      <main className="pt-6 flex-grow">
        <Outlet />
      </main>

      <footer className="bg-card1 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">© { new Date().getFullYear() } CalorieBomb. All rights reserved. <Link href="/privacy-policy">Privacy Policy</Link></div>
      </footer>
    </div>
  );
}

export default MainLayout
