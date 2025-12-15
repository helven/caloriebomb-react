// 1. React and React ecosystem imports
import { setFoodDetail, setFoods, setListStatus } from '@/store/slices/foods/foodsSlice';
import { useDispatch } from 'react-redux';

// 2. Asset imports

// 3. Project services and utilities
import { foodService } from '@/services/api/food/foodService';
import { useNavigationService } from '@/services/navigation';
import type { ApiFoodResponse, Food } from '@/types';
import store from '@/store/store';

export const useFoods = () => {
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

  const fetchFoods = async () => {
    dispatch(setListStatus('loading'));

    try {
      const response = await foodService.getFoods({
        page: currentPage,
        perpage: itemsPerPage,
        sortby: sortBy,
        sortorder: sortOrder,
        category: category,
        search: search,
      });
      const foods = response.data as { success: boolean; data: { items: Food[]; total: number } };
      if (!foods.success) {
        return;
      }
      dispatch(setFoods(foods.data.items));
      dispatch(setListStatus('succeeded'));
    } catch (error) {
      dispatch(setListStatus('failed'));
      console.error('Error fetching foods: ', error);
    }
  };

  const fetchFoodById = async (foodId: number) => {
    // check existing food
    const existingFood = store.getState().foods.byId[foodId];
    if (existingFood && existingFood.hasFullData && (existingFood.expiresAt ?? 0) > Date.now()) {
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
