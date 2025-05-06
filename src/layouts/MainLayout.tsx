//import { useState } from 'react'
//import { useContext } from 'react';
import { Outlet } from 'react-router-dom'

//import { useTheme } from "../hooks/useTheme";
import Logo from '../components/Logo'

function MainLayout() {
  //const theme = useTheme();

  //const theme = useTheme();

  return (
    <div id="main-layout">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a className="flex items-center" href="/">
            <h1 className="text-2xl font-bold text-orange-500 dark:text-orange-400">CalorieBomb</h1><span className="text-xl ml-1">💣</span>
          </a>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input type="text" placeholder="Search for foods..." className="pl-3 pr-10 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-64"  />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Logo />
              </div>
            </div>
            <button className="text-xl">🌙</button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default MainLayout
