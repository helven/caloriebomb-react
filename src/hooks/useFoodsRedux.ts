// 1. React and React ecosystem imports
import { setFoodDetail, setFoods, setListStatus } from '@/store/slices/foods/foodsSlice';
import { isFreshFood } from '@/store/slices/foods/foodsCache';
import { useDispatch } from 'react-redux';

// 2. Asset imports

// 3. Project services and utilities
import { foodService } from '@/services/api/food/foodService';
import { useNavigationService } from '@/services/navigation';
import store from '@/store/store';
import type { ApiFoodResponse, Food, FoodDetailState } from '@/types';

export const useFoodsRedux = () => {
  const navigation = useNavigationService();
  const dispatch = useDispatch();

  // Filter, sorting
  const category: string = navigation.getQueryString('category') || '';
  const search: string = navigation.getQueryString('search') || '';
  const sortBy: string = navigation.getQueryString('sortby') || 'name';
  const sortOrder: 'asc' | 'desc' = (navigation.getQueryString('sortorder') as 'asc' | 'desc') || 'asc';

  // Pagination
  const currentPage: number = Number(navigation.getQueryString('page')) || 1;
  const itemsPerPage: number = Number(navigation.getQueryString('per_page')) || 9;

  // Returns the total food count from the API, for the page's Pagination. Returns 0 on failure.
  const fetchFoods = async (): Promise<number> => {
    dispatch(setListStatus('loading'));

    try {
      const response = await foodService.getFoods({
        page: currentPage,
        perPage: itemsPerPage,
        sortBy: sortBy,
        sortOrder: sortOrder,
        category: category,
        search: search,
      });
      const foods = response.data as { success: boolean; data: { items: Food[]; total: number } };
      if (!foods.success) {
        // Without this, the status stays 'loading' forever
        dispatch(setListStatus('failed'));
        return 0;
      }
      dispatch(setFoods(foods.data.items));
      dispatch(setListStatus('succeeded'));
      return foods.data.total;
    } catch (error) {
      dispatch(setListStatus('failed'));
      console.error('Error fetching foods: ', error);
      return 0;
    }
  };

  const fetchFoodById = async (foodId: number) => {
    // check existing food
    const existingFood: FoodDetailState | undefined = store.getState().foods.foodsById[foodId];
    if (isFreshFood(existingFood)) {
      return; // Already cached, skip fetch
    }

    try {
      const response = await foodService.getFoodById(foodId);
      const apiResponse = response.data as ApiFoodResponse;

      if (!apiResponse.success) {
        return;
      }
      const food = apiResponse.data;

      dispatch(setFoodDetail(food));
    } catch (error) {
      console.error('Error fetching food: ', error);
    }
  };

  return { fetchFoods, fetchFoodById };
};
