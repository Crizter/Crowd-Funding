import React from 'react'
import RoutesComponent from './components/RoutesComponent.jsx'
function App() {
  
  const BACKEND_URL  = import.meta.env.VITE_BACKEND_URL
  return (
     <>
     <RoutesComponent />
     </>
  )
}

export default App