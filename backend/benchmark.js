/**
 * Benchmark Engine
 * 
 * This module handles the core benchmarking logic:
 * - Generates test data of various sizes
 * - Runs algorithms multiple times
 * - Measures execution time with high precision
 * - Calculates average results
 */

const { bubbleSort, mergeSort, quickSort } = require('./algorithms/sorting');
const { linearSearch, binarySearch } = require('./algorithms/searching');

// Input sizes to test
const INPUT_SIZES = [100, 500, 1000, 5000];

// Number of runs per input size for averaging
const RUNS_PER_SIZE = 5;

/**
 * Generates a random array of given size
 */
function generateRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 10000));
  }
  return arr;
}

/**
 * Generates a sorted array for binary search benchmarking
 */
function generateSortedArray(size) {
  const arr = generateRandomArray(size);
  return arr.sort((a, b) => a - b);
}

/**
 * Measures execution time of a function in milliseconds
 * Uses high-resolution timer for accuracy
 */
function measureTime(fn, ...args) {
  const start = performance.now();
  fn(...args);
  const end = performance.now();
  return end - start;
}

/**
 * Benchmarks a sorting algorithm across multiple input sizes
 */
function benchmarkSortingAlgorithm(algorithm) {
  const results = [];

  for (const size of INPUT_SIZES) {
    let totalTime = 0;

    // Run multiple times and average the results
    for (let run = 0; run < RUNS_PER_SIZE; run++) {
      const arr = generateRandomArray(size);
      const time = measureTime(algorithm, [...arr]); // Pass a copy
      totalTime += time;
    }

    const avgTime = totalTime / RUNS_PER_SIZE;
    results.push({
      n: size,
      time: parseFloat(avgTime.toFixed(4))
    });
  }

  return results;
}

/**
 * Benchmarks a searching algorithm across multiple input sizes
 */
function benchmarkSearchingAlgorithm(algorithm, needsSorted = false) {
  const results = [];

  for (const size of INPUT_SIZES) {
    let totalTime = 0;

    // Run multiple times and average the results
    for (let run = 0; run < RUNS_PER_SIZE; run++) {
      const arr = needsSorted ? generateSortedArray(size) : generateRandomArray(size);
      // Search for a random element (may or may not exist)
      const target = Math.floor(Math.random() * 10000);
      const time = measureTime(algorithm, arr, target);
      totalTime += time;
    }

    const avgTime = totalTime / RUNS_PER_SIZE;
    results.push({
      n: size,
      time: parseFloat(avgTime.toFixed(4))
    });
  }

  return results;
}

/**
 * Main benchmark function that routes to the correct algorithm
 */
function runBenchmark(algorithmName) {
  console.log(`Starting benchmark for: ${algorithmName}`);

  let results;

  switch (algorithmName) {
    case 'bubbleSort':
      results = benchmarkSortingAlgorithm(bubbleSort);
      break;
    case 'mergeSort':
      results = benchmarkSortingAlgorithm(mergeSort);
      break;
    case 'quickSort':
      results = benchmarkSortingAlgorithm(quickSort);
      break;
    case 'linearSearch':
      results = benchmarkSearchingAlgorithm(linearSearch, false);
      break;
    case 'binarySearch':
      results = benchmarkSearchingAlgorithm(binarySearch, true);
      break;
    default:
      throw new Error(`Unknown algorithm: ${algorithmName}`);
  }

  console.log(`Benchmark complete for: ${algorithmName}`);
  return {
    algorithm: algorithmName,
    results: results
  };
}

/**
 * Gets list of available algorithms
 */
function getAvailableAlgorithms() {
  return [
    { id: 'bubbleSort', name: 'Bubble Sort', complexity: 'O(n²)', type: 'sorting' },
    { id: 'mergeSort', name: 'Merge Sort', complexity: 'O(n log n)', type: 'sorting' },
    { id: 'quickSort', name: 'Quick Sort', complexity: 'O(n log n) avg', type: 'sorting' },
    { id: 'linearSearch', name: 'Linear Search', complexity: 'O(n)', type: 'searching' },
    { id: 'binarySearch', name: 'Binary Search', complexity: 'O(log n)', type: 'searching' }
  ];
}

module.exports = {
  runBenchmark,
  getAvailableAlgorithms,
  INPUT_SIZES,
  RUNS_PER_SIZE
};
