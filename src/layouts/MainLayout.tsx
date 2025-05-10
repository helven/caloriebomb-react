// @ts-nocheck : JS compatible
import { useState } from 'react';
import { Outlet } from 'react-router-dom'

//import { useTheme } from "../hooks/useTheme";
import Header from '../components/Header'
import Logo from '../components/Logo'

function MainLayout({ children }) {
  //const theme = useTheme();

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <Header />
      <main className="pt-6 flex-grow">
        <Outlet />
      </main>

      <footer className="bg-card py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">© 2025 CalorieBomb. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default MainLayout
