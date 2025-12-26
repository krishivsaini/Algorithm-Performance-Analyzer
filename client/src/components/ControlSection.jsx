import { useState, useEffect } from 'react'

function ControlSection({ selectedAlgorithm, onAlgorithmSelect, onBenchmark, isLoading, apiBase = '' }) {
  const [algorithms, setAlgorithms] = useState([])

  useEffect(() => {
    // Fetch available algorithms from backend
    fetch(`${apiBase}/api/algorithms`)
      .then(res => res.json())
      .then(data => setAlgorithms(data.algorithms))
      .catch(error => {
        console.error('Error loading algorithms:', error)
        alert('Failed to connect to the backend. Make sure the server is running.')
      })
  }, [apiBase])

  const handleSelectChange = (e) => {
    const algoId = e.target.value
    if (!algoId) {
      onAlgorithmSelect(null)
      return
    }

    const algo = algorithms.find(a => a.id === algoId)
    onAlgorithmSelect(algo)
  }

  return (
    <section className="bg-white p-8 rounded-2xl mb-8 shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Select Algorithm to Benchmark
      </h2>
      
      <div className="flex flex-wrap gap-5 items-end">
        <div className="flex-1 min-w-[280px]">
          <label htmlFor="algorithm-select" className="block mb-2 font-semibold text-slate-700">
            Choose an algorithm:
          </label>
          <div className="relative">
            <select 
              id="algorithm-select" 
              className="w-full px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl bg-white text-slate-800 cursor-pointer hover:border-blue-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed appearance-none pr-10"
              onChange={handleSelectChange}
              disabled={isLoading}
              value={selectedAlgorithm?.id || ''}
            >
              <option value="">-- Select an algorithm --</option>
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>
                  {algo.name} - {algo.complexity}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <button 
          className="px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none active:scale-95 flex items-center gap-2"
          onClick={onBenchmark}
          disabled={!selectedAlgorithm || isLoading}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Run Benchmark
        </button>
      </div>

      {selectedAlgorithm && (
        <div className="mt-6 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-gradient-to-br from-slate-50 to-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              {selectedAlgorithm.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p className="text-slate-600 bg-white/70 px-4 py-2 rounded-lg">
                <strong className="text-slate-700">Type:</strong> {selectedAlgorithm.type.charAt(0).toUpperCase() + selectedAlgorithm.type.slice(1)}
              </p>
              <p className="text-slate-600 bg-white/70 px-4 py-2 rounded-lg">
                <strong className="text-slate-700">Time Complexity:</strong> <code className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-sm font-mono">{selectedAlgorithm.complexity}</code>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ControlSection
