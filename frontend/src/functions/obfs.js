// https://gist.github.com/olastor/54c78a3d29c69806c57a32eff32f191a

// Global variables
const key = 5; // Rotation index
const n = 126; // Maximum char that will be affected by the algorithm

/**
 * Obfuscate a plaintext string with a simple rotation algorithm similar to
 * the rot13 cipher.
 * @param  {String} str the input string to obfuscate
 * @return {String}     obfuscated string
 */
export function obfuscate(str) {
  if (typeof key !== "number" || key % 1 !== 0 || typeof str !== "string") {
    return str;
  }

  const chars = str.split("");

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i].charCodeAt(0);
    if (c <= n) {
      chars[i] = String.fromCharCode((c + key) % n);
    }
  }

  return chars.join("");
}

/**
 * De-obfuscate an obfuscated string with the method above.
 * @param  {String} str the input string to de-obfuscate
 * @return {String}     plaintext string
 */
export function deobfuscate(str) {
  if (typeof key !== "number" || key % 1 !== 0 || typeof str !== "string") {
    return str;
  }

  const reverseKey = (n - key) % n;
  return obfuscateWithKey(str, reverseKey);
}

/**
 * Helper function to obfuscate with a custom key.
 * @param  {String} str the input string
 * @param  {Number} customKey custom key for obfuscation
 * @return {String} obfuscated string
 */
function obfuscateWithKey(str, customKey) {
  const chars = str.split("");

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i].charCodeAt(0);
    if (c <= n) {
      chars[i] = String.fromCharCode((c + customKey) % n);
    }
  }

  return chars.join("");
}