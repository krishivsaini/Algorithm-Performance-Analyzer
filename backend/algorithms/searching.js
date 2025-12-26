/**
 * Searching Algorithms
 * These algorithms are used for benchmarking purposes only.
 */

/**
 * Linear Search - O(n)
 * Sequential search through the array
 */
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

/**
 * Binary Search - O(log n)
 * Efficient search on sorted arrays
 * Requires the array to be sorted beforehand
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

module.exports = {
  linearSearch,
  binarySearch
};
