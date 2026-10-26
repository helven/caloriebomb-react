// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { FoodDetailState } from '@/types';

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
/**
 * Checks if a cached food entry came from a detail fetch that has not expired yet.
 * Only setFoodDetail sets expiresAt, so a list-only entry is never fresh.
 * Lives in its own file so foodsSlice and foodsThunk can both import it without a cycle.
 */
export const isFreshFood = (entry: FoodDetailState | undefined): boolean => {
  if (entry === undefined) {
    return false;
  }
  if (entry.expiresAt === undefined) {
    return false;
  }
  return entry.expiresAt > Date.now();
};
