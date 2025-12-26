import { useState } from 'react'
import Header from './components/Header'
import InfoSection from './components/InfoSection'
import ControlSection from './components/ControlSection'
import LoadingIndicator from './components/LoadingIndicator'
import ResultsSection from './components/ResultsSection'
import Footer from './components/Footer'

// API base URL - uses environment variable in production, empty for local dev (proxy)
const API_BASE = import.meta.env.VITE_API_URL || ''

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [benchmarkedAlgorithmName, setBenchmarkedAlgorithmName] = useState(null)

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
