import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { useState, useEffect } from 'react'
import Lenis from 'lenis'

import HomePage from './components/HomePage'
import ProjectDetail from './pages/ProjectDetail'
import LoadingScreen from './components/LoadingScreen'

function AppRoutes({ loaded }) {
  if (!loaded) return null

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)

  // Lenis smooth scroll — lerp 0.06 = slow, sticky feel
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Only show loading screen on fresh load, check sessionStorage
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded')
    if (hasLoaded) {
      setLoaded(true)
    }
  }, [])

  const handleLoadDone = () => {
    sessionStorage.setItem('hasLoaded', 'true')
    setLoaded(true)
  }

  return (
    <ThemeProvider>
      <Router>
        {/* Run loading screen if not loaded */}
        {!loaded && <LoadingScreen onDone={handleLoadDone} />}
        
        {/* Mount routes immediately but they wait for loaded to render */}
        <AppRoutes loaded={loaded} />
      </Router>
    </ThemeProvider>
  )
}

export default App
