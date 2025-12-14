import { apiService } from '@/services/api/core/apiService';
import { API_ROUTES } from '@/constants/apiRoutes';

export const foodService = {
  getFoods: ({
    sortby = 'name',
    sortorder = 'asc',
    perpage = 9,
    page = 1,
    category = '',
    search = '',
  }: {
    sortby?: string;
    sortorder?: 'asc' | 'desc';
    perpage?: number;
    page?: number;
    category?: string;
    search?: string;
  } = {}) => {
    const queryParams = new URLSearchParams();

    // Add parameters individually
    if (sortby) queryParams.append('sortby', sortby);
    if (sortorder) queryParams.append('sortorder', sortorder);
    if (perpage) queryParams.append('per_page', perpage.toString());
    if (page) queryParams.append('page', page.toString());
    if (category) queryParams.append('category_slug', category.toString());
    if (search) queryParams.append('search', search.toString());

    return apiService.get(`${API_ROUTES.FOODS.BASE}?${queryParams}`);
  },
  getFoodById: (id: number) => apiService.get(API_ROUTES.FOODS.BY_ID(id)),
  getFoodsByCategory: (category_id: number) => apiService.get(`${API_ROUTES.FOODS.BASE}?category=${category_id}`),
};