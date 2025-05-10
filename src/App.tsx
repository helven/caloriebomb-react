// 1. React and React ecosystem imports
//import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

// 2. Asset imports
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import './styles/global.css'

// 3. Component imports
import appRoutesConfig from './routes/AppRoutes'

function AppRoutes() {
  return useRoutes(appRoutesConfig)
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App
