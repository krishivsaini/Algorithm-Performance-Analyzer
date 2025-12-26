import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function ResultsSection({ results, algorithmName }) {
  const resultsRef = useRef(null)

  useEffect(() => {
    // Scroll to results when they appear
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [results])

  const chartData = {
    labels: results.results.map(r => `n=${r.n}`),
    datasets: [
      {
        label: `${algorithmName} - Execution Time`,
        data: results.results.map(r => r.time),
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#7c3aed',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7c3aed',
        pointHoverBorderWidth: 3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${algorithmName} Performance Analysis`,
        font: {
          size: 20,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        color: '#1e293b',
        padding: 24
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        padding: 16,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        borderColor: 'rgba(124, 58, 237, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Time: ${context.parsed.y.toFixed(4)} ms`
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Input Size (n)',
          font: {
            size: 14,
            weight: 'bold',
            family: "'Inter', sans-serif"
          },
          color: '#64748b'
        },
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          },
          color: '#64748b'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Execution Time (ms)',
          font: {
            size: 14,
            weight: 'bold',
            family: "'Inter', sans-serif"
          },
          color: '#64748b'
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.2)'
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          },
          color: '#64748b'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  // Calculate stats
  const times = results.results.map(r => r.time)
  const minTime = Math.min(...times)
  const maxTime = Math.max(...times)
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length

  return (
    <section ref={resultsRef} className="bg-white p-8 rounded-2xl mb-8 shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Benchmark Results
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Fastest</span>
          </div>
          <p className="text-2xl font-bold text-green-700">{minTime.toFixed(4)} ms</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Average</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">{avgTime.toFixed(4)} ms</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-xl border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">Slowest</span>
          </div>
          <p className="text-2xl font-bold text-orange-700">{maxTime.toFixed(4)} ms</p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-gradient-to-br from-slate-50 to-purple-50 p-6 rounded-xl mb-8 h-[420px]">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Table */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
          Detailed Results
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Input Size (n)</th>
                <th className="py-4 px-6 text-left font-semibold">Avg. Execution Time</th>
                <th className="py-4 px-6 text-left font-semibold">Performance</th>
              </tr>
            </thead>
            <tbody>
              {results.results.map((result, idx) => {
                const perf = result.time === minTime ? 'fastest' : result.time === maxTime ? 'slowest' : 'normal'
                return (
                  <tr key={result.n} className={`border-b border-slate-100 hover:bg-slate-50 ${idx === results.results.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="py-4 px-6">
                      <span className="font-mono bg-slate-100 px-3 py-1 rounded-lg text-slate-700 font-semibold">{result.n}</span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">{result.time.toFixed(4)} ms</td>
                    <td className="py-4 px-6">
                      {perf === 'fastest' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Fastest
                        </span>
                      )}
                      {perf === 'slowest' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Slowest
                        </span>
                      )}
                      {perf === 'normal' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Normal
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
        <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          Key Insights
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
            <span>The graph shows how execution time grows as input size increases</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </span>
            <span>Steeper curves indicate worse scalability (higher time complexity)</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </span>
            <span>Real-world performance can differ from theoretical predictions due to constant factors</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default ResultsSection
