function Footer() {
  return (
    <footer className="text-center py-8 px-6 mt-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Limitations</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-3">
          Results may vary based on system load and JavaScript runtime. 
          Benchmarks measure execution time only, not memory usage.
        </p>
        <p className="text-slate-400 text-sm">
          Built to demonstrate the difference between theoretical complexity and empirical performance.
        </p>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-slate-400 text-xs">
            Algorithm Performance Analyzer
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
