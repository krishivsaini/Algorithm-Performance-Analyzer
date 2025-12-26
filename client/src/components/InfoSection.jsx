function InfoSection() {
  return (
    <section className="bg-white p-8 rounded-2xl mb-8 shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        About This Project
      </h2>
      <p className="text-slate-600 mb-6 leading-relaxed text-lg">
        This tool bridges the gap between <strong className="text-slate-800">theoretical time complexity</strong> (Big-O) 
        and <strong className="text-slate-800">real-world execution time</strong>. Instead of just analyzing algorithms on paper, 
        you can observe how they actually perform with different input sizes.
      </p>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          Benchmarking Methodology
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
            <span>Input sizes tested: <strong className="text-slate-800">100, 500, 1000, 5000</strong></span>
          </li>
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <span>Each algorithm runs <strong className="text-slate-800">5 times per input size</strong></span>
          </li>
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </span>
            <span>Results are <strong className="text-slate-800">averaged</strong> to reduce system noise</span>
          </li>
          <li className="flex items-start gap-3 text-slate-600">
            <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span>All benchmarking happens on the <strong className="text-slate-800">backend</strong> for consistency</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default InfoSection
