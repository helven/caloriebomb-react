// 1. React and React ecosystem imports
import { useState } from 'react';

// 2. Asset imports

// 3. Project services and utilities
import { foodService } from '@/services/api/food/foodService';
import { useNavigationService } from '@/services/navigation';
import type { ApiFoodResponse, Food } from '@/types';

export const useFoods = () => {
  const navigation = useNavigationService();

  // Local state
  const [foodDetail, setFoodDetail] = useState<Food | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [listStatus, setListStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');

  // Filter, sorting
  const category: string = navigation.getQueryString('category') || '';
  const search: string = navigation.getQueryString('search') || '';
  const sortBy: string = navigation.getQueryString('sortby') || 'name';
  const sortOrder: 'asc' | 'desc' = (navigation.getQueryString('sortorder') as 'asc' | 'desc') || 'asc';

  // Pagination
  const currentPage: number = Number(navigation.getQueryString('page')) || 1;
  const itemsPerPage: number = Number(navigation.getQueryString('per_page')) || 9;

  const fetchFoods = async () => {
    setListStatus('loading');

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
      setFoods(foods.data.items);
      setListStatus('succeeded');
    } catch (error) {
      setListStatus('failed');
      console.error('Error fetching foods: ', error);
    }
  };

  const fetchFoodById = async (foodId: number) => {
    try {
      const response = await foodService.getFoodById(foodId);
      const apiResponse = response.data as ApiFoodResponse;

      if (!apiResponse.success) {
        return;
      }
      const food = apiResponse.data;

      setFoodDetail(food);
    } catch (error) {
      console.error('Error fetching food: ', error);
    }
  };

  return { foodDetail, foods, listStatus, fetchFoods, fetchFoodById };
};
