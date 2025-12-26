# 🔬 Algorithm Performance Analyzer

A web-based application that empirically measures and visualizes the real-world execution time of classical algorithms across different input sizes. This project bridges the gap between **theoretical time complexity (Big-O)** and **actual runtime behavior** observed in practice.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Algorithms Included](#algorithms-included)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Benchmarking Methodology](#benchmarking-methodology)
- [API Documentation](#api-documentation)
- [Key Insights](#key-insights)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)

## 🎯 Problem Statement

In academic settings, algorithms are often compared only using theoretical complexity. However, in real systems:

- **Constant factors matter** - Two O(n log n) algorithms can have vastly different performance
- **Input size affects performance differently** - Some algorithms excel with small inputs, others with large
- **Data distribution impacts behavior** - Worst-case vs average-case scenarios differ significantly

This project allows users to **observe and compare real execution time trends** rather than relying solely on theory.

## 💡 Solution Overview

The Algorithm Performance Analyzer provides:

1. **Empirical Benchmarking** - Measure actual execution time, not just theoretical complexity
2. **Visual Comparison** - See how algorithms scale with increasing input sizes
3. **Scientific Methodology** - Multiple runs with averaging to reduce noise
4. **Educational Tool** - Understand the gap between theory and practice

## 🏗️ System Architecture

The project follows a **client-server architecture** with clear separation of responsibilities:

```
┌─────────────────────────────────────────────────────────┐
│                 FRONTEND (React + Vite)                 │
│  ┌────────────────────────────────────────────────┐    │
│  │  • React Components (modular UI)               │    │
│  │  • State Management (React Hooks)              │    │
│  │  • Chart.js Visualization (react-chartjs-2)    │    │
│  │  • Vite Dev Server (HMR)                       │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP Request (POST /api/benchmark)
                       │ { "algorithm": "quickSort" }
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                 BACKEND (Node.js + Express)             │
│  ┌────────────────────────────────────────────────┐    │
│  │  1. Receive algorithm selection                │    │
│  │  2. Generate test data (various sizes)         │    │
│  │  3. Run algorithm 5 times per size             │    │
│  │  4. Measure execution time (high-resolution)   │    │
│  │  5. Calculate averages                         │    │
│  │  6. Return structured results                  │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Frontend Responsibilities ✅
- Display algorithm selection UI
- Send API requests to backend
- Visualize results with interactive charts
- Show performance data in tables

### Frontend Does NOT ❌
- Run algorithms
- Measure execution time
- Perform heavy computation

### Backend Responsibilities ✅
- Execute all algorithms
- Generate test data
- Measure execution time with precision
- Calculate statistical averages
- Ensure fair benchmarking conditions

## ✨ Features

- **5 Classic Algorithms**: Bubble Sort, Merge Sort, Quick Sort, Linear Search, Binary Search
- **Multiple Input Sizes**: Test with 100, 500, 1000, and 5000 elements
- **Statistical Accuracy**: 5 runs per input size with averaging
- **Interactive Visualization**: Beautiful charts showing performance trends
- **Detailed Results**: Tabular data with exact timing measurements
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Benchmarking**: See results as they're computed

## 🧮 Algorithms Included

| Algorithm | Type | Time Complexity | Space Complexity |
|-----------|------|----------------|------------------|
| **Bubble Sort** | Sorting | O(n²) | O(1) |
| **Merge Sort** | Sorting | O(n log n) | O(n) |
| **Quick Sort** | Sorting | O(n log n) avg, O(n²) worst | O(log n) |
| **Linear Search** | Searching | O(n) | O(1) |
| **Binary Search** | Searching | O(log n) | O(1) |

## 🚀 Installation

### Prerequisites

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/krishivsaini/Algorithm-Performance-Analyzer.git
   cd Algorithm-Performance-Analyzer
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   This installs both backend and frontend (React) dependencies.

3. **Development mode (recommended)**
   ```bash
   npm run dev
   ```
   This starts both:
   - Backend API server on http://localhost:3000
   - React dev server with HMR on http://localhost:5173

4. **Production mode**
   ```bash
   npm run build        # Build React app
   npm start            # Start backend (serves React build)
   ```

5. **Open your browser**
   - Development: http://localhost:5173 (Vite dev server)
   - Production: http://localhost:3000 (Express serves React build)

## 📖 Usage

1. **Select an Algorithm**
   - Open the application in your browser
   - Choose an algorithm from the dropdown menu
   - View the algorithm's complexity information

2. **Run Benchmark**
   - Click the "Run Benchmark" button
   - Wait for the backend to complete the measurements (a few seconds)
   - The loading indicator shows progress

3. **Analyze Results**
   - View the interactive line chart showing execution time vs input size
   - Check the detailed results table for exact timings
   - Compare the empirical results with theoretical complexity

## 📁 Project Structure

```
Algorithm-Performance-Analyzer/
│
├── backend/
│   ├── algorithms/
│   │   ├── sorting.js          # Bubble, Merge, Quick Sort
│   │   └── searching.js        # Linear, Binary Search
│   ├── benchmark.js            # Benchmarking engine
│   client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── InfoSection.jsx
│   │   │   ├── ControlSection.jsx
│   │   │   ├── LoadingIndicator.jsx
│   │   │   ├── ResultsSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx             # Main React component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Frontend dependencies
│
├── package.json                # Root drontend logic and Chart.js
│
├── package.json                # Dependencies and scripts
├── .gitignore
├── LICENSE
└── README.md
```

## 🔬 Benchmarking Methodology

### Input Sizes
```javascript
[100, 500, 1000, 5000]
```

### Measurement Process

1. **Generate Fresh Data** - Random array created for each run
2. **High-Resolution Timing** - Uses `performance.now()` for microsecond precision
3. **Multiple Runs** - Each algorithm runs 5 times per input size
4. **Statistical Averaging** - Results averaged to reduce system noise
5. **Data Collection** - Structured JSON response sent to frontend

### Example Flow

```javascript
For n = 1000:
  Run 1: 8.234 ms
  Run 2: 8.156 ms
  Run 3: 8.301 ms
  Run 4: 8.189 ms
  Run 5: 8.245 ms
  
Average: 8.225 ms → Reported Result
```

### Why Averaging?

- **Reduces System Noise** - Background processes, garbage collection
- **More Stable Results** - Consistent, reproducible measurements
- **Realistic Performance** - Reflects typical behavior, not edge cases

## 📡 API Documentation

### GET `/api/algorithms`

Returns list of available algorithms.

**Response:**
```json
{
  "algorithms": [
    {
      "id": "bubbleSort",
      "name": "Bubble Sort",
      "complexity": "O(n²)",
      "type": "sorting"
    },
    ...
  ]
}
```

### POST `/api/benchmark`

Runs benchmark for specified algorithm.

**Request:**
```json
{
  "algorithm": "quickSort"
}
```

**Response:**
```json
{
  "algorithm": "quickSort",
  "results": [
    { "n": 100, "time": 0.8234 },
    { "n": 500, "time": 4.2156 },
    { "n": 1000, "time": 9.1023 },
    { "n": 5000, "time": 52.4567 }
  ]
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Algorithm Performance Analyzer API is running"
}
```

## 💡 Key Insights

This project demonstrates several important concepts:

1. **Theory vs Practice**
   - Algorithms with the same Big-O can perform differently
   - Constant factors and implementation details matter

2. **Quick Sort vs Merge Sort**
   - Quick Sort may be faster on average despite same O(n log n) complexity
   - Merge Sort provides more predictable, stable performance

3. **Scalability Observation**
   - See exactly how algorithms scale with real data
   - Visualize the difference between O(n), O(n log n), and O(n²)

4. **Real-World Performance**
   - System factors affect benchmarks
   - Theoretical analysis alone is insufficient

## ⚠️ Limitations

- **Memory Usage Not Measured** - Currently only tracks execution time
- **Runtime Variability** - Results influenced by JavaScript engine and system load
- **Single-Threaded** - No parallel execution testing
- **Limited Algorithms** - Only 5 classic algorithms currently included
- **Input Distribution** - Only random data tested, not worst/best cases

## 🔮 Future Improvements

- [ ] **Memory Profiling** - Track space complexity alongside time
- [ ] **More Algorithms** - Graph algorithms, dynamic programming, etc.
- [ ] **Multiple Languages** - Compare JavaScript vs Python vs C++
- [ ] **Best/Worst Case Testing** - Pre-sorted, reverse-sorted inputs
- [ ] **CPU Isolation** - More controlled benchmarking environment
- [ ] **Historical Comparison** - Save and compare multiple benchmark runs
- [ ] **Algorithm Animation** - Visualize how algorithms work
- [ ] **Custom Input** - Allow users to provide their own test data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Krishiv Saini**

---

Built to demonstrate the difference between theoretical complexity and empirical performance. 🚀