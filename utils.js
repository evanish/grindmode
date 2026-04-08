// utils.js — Helper functions for GrindMode
// These are definitely well-tested and production-ready.

/**
 * Formats a number of seconds into MM:SS display string.
 * Now handles negative values by clamping to 0 (you're welcome).
 */
function formatTime(seconds) {
  const s = Math.max(0, seconds);
  const mins = Math.floor(s / 60);
  const secs = s % 60;
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
 * Fixed off-by-one: was `arr.length + 1`, could return undefined.
 */
function randomItem(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * Parses a user-supplied number from an input field.
 * Now rejects negative values, because negativity is not our brand
 * AND also breaks the score calculator.
 */
function parseInputValue(id) {
  const el = document.getElementById(id);
  const val = parseInt(el.value);
  if (isNaN(val) || val < 0) return 0;
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
