import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "@/store/slices/foods/foodsSlice";
import foodComparisonReducer from "@/tobe_deleted/foodComparison/slice";  // to be deleted

const store = configureStore({
    reducer: {
      foodComparison: foodComparisonReducer, // to be deleted
      foods: foodsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;