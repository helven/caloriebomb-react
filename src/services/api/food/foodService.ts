import { apiService } from '@/services/api/core/apiService';
import { API_ROUTES } from '@/constants/apiRoutes';

export const foodService = {
  getFoods: ({
    sortBy = 'name',
    sortOrder = 'asc',
    perPage = 9,
    page = 1,
    category = '',
    search = '',
  }: {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    perPage?: number;
    page?: number;
    category?: string;
    search?: string;
  } = {}) => {
    const queryParams = new URLSearchParams();

    // Add parameters individually
    if (sortBy) queryParams.append('sortby', sortBy);
    if (sortOrder) queryParams.append('sortorder', sortOrder);
    if (perPage) queryParams.append('per_page', perPage.toString());
    if (page) queryParams.append('page', page.toString());
    if (category) queryParams.append('category_slug', category.toString());
    if (search) queryParams.append('search', search.toString());

    return apiService.get(`${API_ROUTES.FOODS.BASE}?${queryParams}`);
  },
  getFoodById: (id: number) => apiService.get(API_ROUTES.FOODS.BY_ID(String(id))),
  // getFoodsByCategory: (category_id: number | string) => apiService.get(`${API_ROUTES.FOODS.BASE}?category=${category_id}`),
};