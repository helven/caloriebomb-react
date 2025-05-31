const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://caloriebomb-lrv.local';

export const API_ROUTES = {
  BASEURL: API_BASE_URL,
  FOODS: {
    BASE: `${API_BASE_URL}/api/v1/foods`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/v1/foods/${id}`,
    BY_CATEGORY: (category_id: string) => `${API_BASE_URL}/api/v1/foods?category_id=${category_id}`,
  }
} as const;