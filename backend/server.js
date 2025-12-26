/**
 * Express Server for Algorithm Performance Analyzer
 * 
 * This server handles:
 * - API endpoints for benchmarking
 * - Serving the frontend
 * - CORS configuration
 */

const express = require('express');
const cors = require('cors');
const { runBenchmark, getAvailableAlgorithms } = require('./benchmark');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://algorithm-performance-analyzer.vercel.app'].filter(Boolean)
    : '*',
  methods: ['GET', 'POST'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());


/**
 * GET /api/algorithms
 * Returns list of available algorithms
 */
app.get('/api/algorithms', (req, res) => {
  try {
    const algorithms = getAvailableAlgorithms();
    res.json({ algorithms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/benchmark
 * Runs benchmark for a specific algorithm
 * 
 * Request body:
 * {
 *   "algorithm": "quickSort"
 * }
 * 
 * Response:
 * {
 *   "algorithm": "quickSort",
 *   "results": [
 *     { "n": 100, "time": 0.8 },
 *     { "n": 500, "time": 4.2 },
 *     ...
 *   ]
 * }
 */
app.post('/api/benchmark', (req, res) => {
  try {
    const { algorithm } = req.body;

    if (!algorithm) {
      return res.status(400).json({ error: 'Algorithm name is required' });
    }

    console.log(`Received benchmark request for: ${algorithm}`);

    // Run the benchmark (this may take a few seconds)
    const result = runBenchmark(algorithm);

    res.json(result);
  } catch (error) {
    console.error('Benchmark error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Algorithm Performance Analyzer API is running' });
});

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Algorithm Performance Analyzer API',
    endpoints: {
      algorithms: 'GET /api/algorithms',
      benchmark: 'POST /api/benchmark',
      health: 'GET /api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Algorithm Performance Analyzer Server`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Backend ready for benchmarking`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});

module.exports = app;
