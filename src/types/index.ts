export interface Food {
  id: number,
  source_url: string,
  name: string,
  category: {
      id: number,
      parent_id: number,
      name: string,
      slug: string,
      emoji: string,
      level: number,
      [key: string]: any,
  },
  category_id: number,
  energy_kj: number,
  calories_kcal: number,
  protein_g: number,
  carbohydrate_g: number,
  fat_g: number,
  saturated_fat_g: number,
  monounsaturated_fat_g: number,
  polyunsaturated_fat_g: number,
  cholesterol_mg: number,
  fiber_g: number,

  hasFullData?: boolean,
  status?: 'idle' | 'loading' | 'succeeded' | 'failed',
  [key: string]: any,
}

export interface FoodsState {
  byId: Record<number, Food>;
  list: { ids: number[]; page: number; status: 'idle'|'loading'|'succeeded'|'failed' };
  compareList: number[];
  [key: string]: any,
}

export interface ApiFoodResponse {
  success: boolean;
  data: Food;
}