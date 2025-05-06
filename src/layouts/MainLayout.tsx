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
      <Outlet />
    </div>
  );
}

export default MainLayout
