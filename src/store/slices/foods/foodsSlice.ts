// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Redux ---
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
import { isFreshFood } from '@/store/slices/foods/foodsCache';
import { fetchFoodDetail, fetchFoods } from '@/store/slices/foods/foodsThunk';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { FoodsState, FoodDetailState, Food, FoodsStatus } from '@/types';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour in ms

const initialState: FoodsState = {
  foodsById: {},
  list: { ids: [], page: 1, totalItems: 0, status: 'idle', error: null },
  compareFoodIds: [],
};

// -----------------------------------------------------------------------------
// SLICE
// -----------------------------------------------------------------------------
const foodsSlice = createSlice({
  name: 'foods',
  initialState: initialState,
  // Normal reducers: for changes your own code makes, with no fetch. You dispatch these yourself.
  reducers: {
    // --- Set Food Listing ---
    setFoods(state: FoodsState, action: PayloadAction<Food[]>) {
      action.payload.forEach((food) => {
        const oldEntry: FoodDetailState | undefined = state.foodsById[food.id];

        if (isFreshFood(oldEntry)) {
          // Merge with old data
          state.foodsById[food.id].food = { ...oldEntry, ...food };
        } else {
          // Fresh push
          state.foodsById[food.id] = {
            food: food,
            status: 'succeeded',
            hasFullData: false,
            expiresAt: Date.now() + CACHE_DURATION,
          };
        }

        if (!state.list.ids.includes(food.id)) {
          state.list.ids.push(food.id);
        }
      });
    },
    // --- Set List Status ---
    setListStatus(state: FoodsState, action: PayloadAction<FoodsStatus>) {
      state.list.status = action.payload;
    },
    // --- Set Food Detail ---
    setFoodDetail(state: FoodsState, action: PayloadAction<Food>) {
      state.foodsById[action.payload.id] = {
        food: action.payload,
        status: 'succeeded',
        hasFullData: true,
        expiresAt: Date.now() + CACHE_DURATION,
      };
    },
    // --- Reset Food List ---
    resetFoods: (state: FoodsState) => {
      state.foodsById = {};
      state.list = { ids: [], page: 1, totalItems: 0, status: 'idle', error: null };
      state.compareFoodIds = [];
      state.error = null;
    },

    // --- Compare ---
    addToCompare(state: FoodsState, action: PayloadAction<number>) {
      if (state.compareFoodIds.includes(action.payload)) {
        // Prevent duplicates
        return;
      }
      state.compareFoodIds.push(action.payload);
    },
    removeFromCompare(state: FoodsState, action: PayloadAction<number>) {
      state.compareFoodIds = state.compareFoodIds.filter((foodId) => foodId !== action.payload);
    },
    clearCompare(state: FoodsState) {
      state.compareFoodIds = [];
    },
  },
  extraReducers: (builder) => {
    // --- fetchFoods ---
    builder.addCase(fetchFoods.pending, (state: FoodsState) => {
      state.list.status = 'loading';
      state.list.error = null;
    });
    builder.addCase(fetchFoods.fulfilled, (state: FoodsState, action) => {
      // Reset list to empty for new page
      state.list.ids = [];
      action.payload.items.forEach((food) => {
        const oldEntry: FoodDetailState | undefined = state.foodsById[food.id];

        // Push food in the foodsById map, merge with old data if it's still fresh
        if (isFreshFood(oldEntry)) {
          // Merge with old data
          state.foodsById[food.id].food = { ...oldEntry, ...food };
        } else {
          // Fresh push
          state.foodsById[food.id] = {
            food: food,
            status: 'succeeded',
            hasFullData: false,
            expiresAt: Date.now() + CACHE_DURATION,
          };
        }

        // Push food id into the list of ids, skip duplicates inside the same response
        if (!state.list.ids.includes(food.id)) {
          state.list.ids.push(food.id);
        }
      });

      state.list.totalItems = action.payload.total;
      state.list.status = 'succeeded';
    });
    builder.addCase(fetchFoods.rejected, (state, action) => {
      state.list.status = 'failed';
      state.list.error = action.error.message ?? 'Unknown error';
    });

    // --- fetchFoodDetail  ---
    builder.addCase(fetchFoodDetail.pending, (state: FoodsState, action) => {
      if (!state.foodsById[action.meta.arg]) {
        return;
      }
      state.foodsById[action.meta.arg].status = 'loading';
    });
    builder.addCase(fetchFoodDetail.fulfilled, (state: FoodsState, action) => {
      state.foodsById[action.payload.id] = {
        food: action.payload,
        status: 'succeeded',
        hasFullData: true,
        expiresAt: Date.now() + CACHE_DURATION,
      };
    });
    builder.addCase(fetchFoodDetail.rejected, (state: FoodsState, action) => {
      if (!state.foodsById[action.meta.arg]) {
        return;
      }
      state.foodsById[action.meta.arg].status = 'failed';
    });
  },
});

export const { setFoods, setFoodDetail, setListStatus, resetFoods, addToCompare, removeFromCompare, clearCompare } = foodsSlice.actions;
export default foodsSlice.reducer;
