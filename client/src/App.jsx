import { useState, useEffect } from 'react'
import Header from './components/Header'
import InfoSection from './components/InfoSection'
import ControlSection from './components/ControlSection'
import LoadingIndicator from './components/LoadingIndicator'
import ResultsSection from './components/ResultsSection'
import Footer from './components/Footer'

// API base URL - uses environment variable in production, empty for local dev (proxy)
const API_BASE = import.meta.env.VITE_API_URL || ''

// Function to hide the startup loader
const hideStartupLoader = () => {
  const loader = document.getElementById('startup-loader')
  if (loader) {
    loader.classList.add('hidden')
    // Remove from DOM after animation completes
    setTimeout(() => {
      loader.remove()
    }, 500)
  }
}

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [benchmarkedAlgorithmName, setBenchmarkedAlgorithmName] = useState(null)

  // Wake up the backend and hide startup loader
  useEffect(() => {
    const wakeUpBackend = async () => {
      const startTime = Date.now()
      const minDisplayTime = 1500 // Show loader for at least 1.5s for smooth UX
      
      try {
        // Ping the health endpoint to wake up the backend
        await fetch(`${API_BASE}/api/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        })
      } catch (error) {
        // Backend might not have /health endpoint, that's okay
        console.log('Backend wake-up ping sent')
      }
      
      // Ensure minimum display time for smooth transition
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsed)
      
      setTimeout(hideStartupLoader, remainingTime)
    }
    
    wakeUpBackend()
  }, [])

  const handleBenchmark = async () => {
    if (!selectedAlgorithm) return

    setIsLoading(true)
    setResults(null)
    
    // Store the algorithm name at the time of benchmarking
    const algorithmName = selectedAlgorithm.name

    try {
      const response = await fetch(`${API_BASE}/api/benchmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          algorithm: selectedAlgorithm.id
        })
      })

      if (!response.ok) {
        throw new Error('Benchmark request failed')
      }

      const data = await response.json()
      setResults(data)
      setBenchmarkedAlgorithmName(algorithmName)
    } catch (error) {
      console.error('Benchmark error:', error)
      alert('Failed to run benchmark. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Header />
        <InfoSection />
        <ControlSection
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmSelect={setSelectedAlgorithm}
          onBenchmark={handleBenchmark}
          isLoading={isLoading}
          apiBase={API_BASE}
        />
        {isLoading && <LoadingIndicator />}
        {results && <ResultsSection results={results} algorithmName={benchmarkedAlgorithmName} />}
        <Footer />
      </div>
    </div>
  )
}

export default App
