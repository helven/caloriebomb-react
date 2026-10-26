// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Redux ---
import { createAsyncThunk } from '@reduxjs/toolkit';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Services ---
import { API_ROUTES } from '@/constants/apiRoutes';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { RootState } from '@/store/store';
import type { Food } from '@/types';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const apiHeaders = {
  'Content-Type': 'application/json',
  'Request-Context': '7bbf3f21-e318-4d1a-ab9f-fc3e744ea8dd', // decoy
  'Client-Context': 'web', // decoy
  'Session-Flag': Math.random().toString(36).substring(2, 8), // decoy
  Meta: import.meta.env.VITE_API_SECRET,
  'Device-Info': /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop', // decoy
  'App-Env': 'prod',
};

// -----------------------------------------------------------------------------
// THUNKS
// -----------------------------------------------------------------------------
const fetchFoods = createAsyncThunk(
  'foods/fetchFoods',
  async (apiUrl: string) => {
    const response = await fetch(apiUrl, {
      headers: apiHeaders,
    });
    // fetch() does not throw on 404, so throw by hand
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = (await response.json()) as { success: boolean; data: { items: Food[]; total: number } };

    // HTTP 200 can still carry success: false, so throw by hand -> RTK dispatches "rejected"
    if (!json.success) {
      throw new Error('API returned success: false');
    }

    const foods: Food[] = json.data.items;
    const total: number = json.data.total;
    return { items: foods, total: total };
  },
  {
    condition: (_apiUrl: String, { getState }) => {
      const rootState = getState() as RootState;
      if (rootState.foods.list.status === 'loading') {
        return false;
      }
      return true;
    },
  },
);

const fetchFoodDetail = createAsyncThunk(
  'foods/fetchFoodDetail',
  async (foodId: number) => {
    const response = await fetch(API_ROUTES.FOODS.BY_ID(String(foodId)), {
      headers: apiHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const json = (await response.json()) as { success: boolean; data: Food };
    if (!json.success) {
      throw new Error('API returned success: false');
    }
    return json.data;
  },
  {
    condition: (foodId, { getState }) => {
      const rootState = getState() as RootState;
      if (rootState.foods.foodsById[foodId]?.status === 'loading') {
        return false;
      }

      return true;
    },
  },
);

export { fetchFoodDetail, fetchFoods };
