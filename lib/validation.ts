/**
 * Saudi phone number validation and formatting utilities
 * Saudi mobile numbers: +966 5X XXX XXXX
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validates Saudi mobile phone number format
 * Valid formats:
 * - +966 50 123 4567
 * - +966 55 123 4567
 * - +966 56 123 4567
 * - +966 58 123 4567
 * - +966 59 123 4567
 */
export function validateSaudiPhone(phone: string): ValidationResult {
  // Remove all whitespace for validation
  const cleaned = phone.replace(/\s/g, '')
  
  // Check if it matches Saudi mobile format: +966 5X XXXXXXX (9 digits after +966)
  const saudiMobileRegex = /^\+9665[0-9]{8}$/
  
  if (!saudiMobileRegex.test(cleaned)) {
    return {
      isValid: false,
      error: 'Please enter a valid Saudi mobile number (+966 5X XXX XXXX)'
    }
  }
  
  return { isValid: true }
}

/**
 * Formats phone number as user types
 * Adds +966 prefix if missing and formats with spaces
 */
export function formatSaudiPhone(input: string): string {
  // Remove all non-digits except +
  let cleaned = input.replace(/[^\d+]/g, '')
  
  // If starts with 05, 055, etc., add +966
  if (cleaned.startsWith('05')) {
    cleaned = '+966' + cleaned.substring(1)
  } else if (cleaned.startsWith('5') && !cleaned.startsWith('+')) {
    cleaned = '+966' + cleaned
  }
  
  // Ensure it starts with +966
  if (!cleaned.startsWith('+966')) {
    if (cleaned.startsWith('966')) {
      cleaned = '+' + cleaned
    } else if (cleaned.length > 0 && !cleaned.startsWith('+')) {
      cleaned = '+966' + cleaned
    }
  }
  
  // Format: +966 5X XXX XXXX
  if (cleaned.startsWith('+966')) {
    const withoutPrefix = cleaned.substring(4) // Remove +966
    let formatted = '+966'
    
    if (withoutPrefix.length > 0) {
      formatted += ' ' + withoutPrefix.substring(0, 2) // 5X
    }
    if (withoutPrefix.length > 2) {
      formatted += ' ' + withoutPrefix.substring(2, 5) // XXX
    }
    if (withoutPrefix.length > 5) {
      formatted += ' ' + withoutPrefix.substring(5, 9) // XXXX
    }
    
    return formatted
  }
  
  return cleaned
}

/**
 * Validates required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      error: `${fieldName} is required`
    }
  }
  return { isValid: true }
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    }
  }
  
  return { isValid: true }
}
