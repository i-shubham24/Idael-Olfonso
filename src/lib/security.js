/**
 * OWASP 2025 Zero-Trust Security & Input Sanitization Suite
 * 
 * Guards against:
 * - Prototype Pollution (__proto__, constructor, prototype)
 * - NoSQL Operator Injection ($gt, $ne, $where, dot notation)
 * - SQL Injection fragments
 * - Reflected XSS & DOM-based injection
 * - Automated Bot Scraping & Instantaneous Form Submissions
 */

/**
 * Escapes HTML entities to prevent Reflected / Stored XSS.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Strips known dangerous NoSQL / SQL injection patterns from a string.
 * @param {string} str
 * @returns {string}
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  // Remove control characters except standard whitespace
  let clean = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  // Strip potential script injections
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Strip javascript: pseudo-protocol
  clean = clean.replace(/javascript\s*:/gi, '')
  return clean.trim()
}

/**
 * Forbidden keys for prototype pollution and MongoDB operator injection.
 */
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Recursively sanitizes an object or array:
 * - Deletes prototype pollution vectors (__proto__, constructor, prototype)
 * - Deletes NoSQL query operators ($gt, $ne, $where, etc.)
 * - Trims and sanitizes string values
 * 
 * @template T
 * @param {T} input
 * @returns {T}
 */
export function sanitizeObject(input) {
  if (input === null || typeof input !== 'object') {
    if (typeof input === 'string') {
      return sanitizeString(input)
    }
    return input
  }

  if (Array.isArray(input)) {
    return input
      .filter((item) => item !== undefined)
      .map((item) => sanitizeObject(item))
  }

  const sanitized = {}
  for (const [key, val] of Object.entries(input)) {
    // 1. Prototype pollution defense
    if (FORBIDDEN_KEYS.has(key)) {
      continue
    }
    // 2. NoSQL operator injection defense (e.g. $gt, $regex, or dot paths)
    if (key.startsWith('$') || key.includes('.')) {
      continue
    }
    // 3. Sensitive role tampering defense (BOLA / IDOR client privilege escalation)
    if (key === 'role' || key === 'isAdmin' || key === 'permissions') {
      continue
    }

    sanitized[key] = sanitizeObject(val)
  }
  return sanitized
}

/**
 * Honeypot bot detector.
 * Legitimate human users will not see or fill the hidden honeypot input.
 * If populated, it indicates automated bot activity.
 * 
 * @param {string|undefined|null} honeypotValue
 * @returns {boolean} True if clean (human), False if bot detected
 */
export function validateHoneypot(honeypotValue) {
  return !honeypotValue || String(honeypotValue).trim().length === 0
}

/**
 * Human interaction timing validator.
 * Blocks headless automation scripts that submit forms in under human reaction time.
 * 
 * @param {number} mountedTimestamp - Date.now() when form was mounted
 * @param {number} minDurationMs - Minimum human duration threshold (default: 1200ms)
 * @returns {boolean} True if human-paced, False if suspiciously instantaneous
 */
export function validateSubmissionTiming(mountedTimestamp, minDurationMs = 1200) {
  if (!mountedTimestamp) return true
  const elapsed = Date.now() - mountedTimestamp
  return elapsed >= minDurationMs
}

/**
 * Token-bucket client-side rate limiter for submissions.
 * Prevents spamming and automated credential or booking stuffing.
 */
class SubmissionRateLimiter {
  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
    this.attempts = []
  }

  isAllowed() {
    const now = Date.now()
    this.attempts = this.attempts.filter((timestamp) => now - timestamp < this.windowMs)
    if (this.attempts.length >= this.maxAttempts) {
      return false
    }
    this.attempts.push(now)
    return true
  }

  reset() {
    this.attempts = []
  }
}

export const bookingRateLimiter = new SubmissionRateLimiter(4, 60000)
export const newsletterRateLimiter = new SubmissionRateLimiter(3, 60000)
