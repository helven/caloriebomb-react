/**
 * Formats nutrient values for display
 * - Returns '0' for null/undefined values
 * - Shows integer for values >= 1
 * - Shows 1 decimal for values between 0.1 and 1
 * - Shows '0' for values < 0.1
 */
// Typescript file
// Next.js compatible
export const formatNutrient = (value: number | null | undefined): string => {
  if (!value) return '0';
  
  if (value < 0.1) return '0';
  
  return value % 1 === 0 
    ? value.toString() 
    : Number(value).toFixed(2);
};


/**
 * Formats currency values
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

/**
 * Formats date to local string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};