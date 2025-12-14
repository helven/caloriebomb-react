import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Food, FoodsState } from "@/types";

const initialState: FoodsState = {
  byId: {},
  list: { ids: [], page: 1, status: 'idle' },
  compareList: [],
};

const foodsSlice = createSlice({
  name: 'foods',
  initialState: initialState,
  reducers: {
    setFoods(state: FoodsState, action: PayloadAction<Food[]>) {
      action.payload.forEach(food => {
        state.byId[food.id] = { ...food, hasFullData: state.byId[food.id]?.hasFullData || false };
        if (!state.list.ids.includes(food.id)) {
          state.list.ids.push(food.id);
        }
      });
    },
    // setFoodSummary(state: FoodsState, action: PayloadAction<Food>) {
    //   state.byId[action.payload.id] = action.payload;
    // },
    setFoodDetail(state: FoodsState, action: PayloadAction<Food>) {
      state.byId[action.payload.id] = {
        ...action.payload,
        hasFullData: true,
      };
    },
    addToCompare(state: FoodsState, action: PayloadAction<number>) {
      if (state.compareList.includes(action.payload)) { // Prevent duplicates
        return;
      }
      state.compareList.push(action.payload);
    },
    removeFromCompare(state: FoodsState, action: PayloadAction<number>) {
      state.compareList = state.compareList.filter((foodId) => foodId !== action.payload);
    },
    clearCompare(state: FoodsState) {
      state.compareList = [];
    },
    setListStatus(state: FoodsState, action: PayloadAction<'idle'|'loading'|'succeeded'|'failed'>) {
      state.list.status = action.payload;
    },

    // addFoodComparison: (state, action) => {
    //   if (state.find(food => food.id === action.payload.id)) { // Prevent duplicates
    //     return;
    //   }

    //   state.push(action.payload); // push food into Redux state
    // },
    // deleteFoodComparison: (state, action) => {
    //   return state = state.filter((food) => food.id !== action.payload);
    // }
  }
});

// export const { addFoodComparison, deleteFoodComparison } = foodsSlice.actions;
export const { setFoods, setFoodDetail, addToCompare, removeFromCompare, setListStatus } = foodsSlice.actions;
export default foodsSlice.reducer;