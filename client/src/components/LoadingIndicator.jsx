function LoadingIndicator() {
  return (
    <div className="text-center py-12 px-6 bg-white rounded-2xl mb-8 shadow-lg border border-slate-100">
      <div className="relative w-16 h-16 mx-auto mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
        {/* Inner pulse */}
        <div className="absolute inset-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full animate-pulse"></div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Running Benchmark...</h3>
      <p className="text-slate-500">Analyzing algorithm performance across different input sizes</p>
      <div className="flex justify-center gap-1 mt-4">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  )
}

export default LoadingIndicator
