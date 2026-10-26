// -----------------------------------------------------------------------------
// FOOD TYPE
// -----------------------------------------------------------------------------
export type FoodsState = {
  foodsById: Record<number, FoodDetailState>;
  list: FoodsListState;
  compareFoodIds: number[];
  [key: string]: unknown;
};

export type FoodsListState = {
  ids: number[]; // food ids for the current page, in display order
  page: number;
  totalItems: number; // from the API, for the Pagination component
  status: FoodsStatus;
  error?: string | null;
  [key: string]: unknown;
};

export type FoodDetailState = {
  food?: Food;
  hasFullData?: boolean;
  expiresAt?: number;
  status: FoodsStatus;
  error?: string | null;
  [key: string]: unknown;
};

export type Food = {
  id: number;
  source_url: string;
  name: string;
  category: {
    id: number;
    parent_id: number;
    name: string;
    slug: string;
    emoji: string;
    level: number;
    [key: string]: unknown;
  };
  category_id: number;
  energy_kj: number;
  calories_kcal: number;
  protein_g: number;
  carbohydrate_g: number;
  fat_g: number;
  saturated_fat_g: number;
  monounsaturated_fat_g: number;
  polyunsaturated_fat_g: number;
  cholesterol_mg: number;
  fiber_g: number;
};

export type FoodsStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ApiFoodResponse = {
  success: boolean;
  data: Food;
};
