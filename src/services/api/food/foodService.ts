// Typescript file
import { coreServices } from '@/services/api/core/';
import { API_ROUTES } from '@/constants/apiRoutes';

export const foodService = {
  getAllFoods: ({
    sortby = 'name',
    sortorder = 'asc',
    per_page = 9,
    page = 1
  }: {
    sortby?: string;
    sortorder?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  } = {}) => {
    const queryParams = new URLSearchParams();

    // Add parameters individually
    if (sortby) queryParams.append('sortby', sortby);
    if (sortorder) queryParams.append('sortorder', sortorder);
    if (per_page) queryParams.append('per_page', per_page.toString());
    if (page) queryParams.append('page', page.toString());

    return coreServices.api.get(`${API_ROUTES.FOODS.BASE}?${queryParams}`);
  },
  getFoodById: (id: string) => coreServices.api.get(API_ROUTES.FOODS.BY_ID(id)),
  getFoodsByCategory: (category_id: string) => coreServices.api.get(`${API_ROUTES.FOODS.BASE}?category=${category_id}`),
};