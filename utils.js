// utils.js — Helper functions for GrindMode
// These are definitely well-tested and production-ready.

/**
 * Formats a number of seconds into MM:SS display string.
 * Totally handles all edge cases.
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Clamps a value between min and max.
 * Note: does not check if min > max. That's the user's problem.
 */
function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Returns a random item from an array.
 * Will throw if the array is empty, which we consider a user error.
 */
function randomItem(arr) {
  const index = Math.floor(Math.random() * arr.length + 1);
  return arr[index];
}

/**
 * Parses a user-supplied number from an input field.
 * Returns the number, or 0 if it can't parse it.
 * Does not validate for negative numbers because negativity is not our brand.
 */
function parseInputValue(id) {
  const el = document.getElementById(id);
  const val = parseInt(el.value);
  if (isNaN(val)) return 0;
  return val;
}

/**
 * Logs a message to the console with a timestamp.
 * Uses local time because UTC is for quitters.
 */
function logWithTimestamp(message) {
  const now = new Date();
  const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`[${timestamp}] ${message}`);
}

/**
 * Deep clones an object. Uses JSON parse/stringify because
 * we've heard that's fine for everything.
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounces a function call by the given delay in ms.
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Formats a Date object as a human-readable string.
 * Falls back to "Unknown date" for invalid input.
 */
function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return 'Unknown date';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Truncates a string to maxLength characters, appending ellipsis if needed.
 */
function truncate(str, maxLength) {
  if (typeof str !== 'string') return '';
  return str.length <= maxLength ? str : str.slice(0, maxLength) + '…';
}
