// 1. React and React ecosystem imports
import { memo, useState } from 'react';

// 2. Asset imports
import { CDN_MEDIA_URL } from '@/constants/global';
import { formatNutrient } from '@/utils/formatters';

// 3. Component imports
import { Link } from '@/components/common/Link';

// 4. Type imports
import type { Food } from '@/types';

const FALLBACK_IMG = `${CDN_MEDIA_URL}/assets/images/food/default-thumb.jpg`;

type FoodCardProps = {
  food: Food;
};

function FoodCard({ food }: FoodCardProps) {
  const [imgSrc, setImgSrc] = useState(`${CDN_MEDIA_URL}/assets/images/food/${food?.id}-thumb.jpg`);

  if (!food) return null;

  function onImgError() {
    setImgSrc(FALLBACK_IMG);
  }

  return (
    <div key={food.id}>
      <div className="food-card">
        <Link href={`/foods/${food.id}`} className="food-thumb relative overflow-hidden">
          <img
            src={imgSrc}
            alt=""
            className="absolute top-[45%] h-full max-w-none -translate-y-[45%]"
            onError={onImgError}
          />
        </Link>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <Link href={`/foods/${food.id}`} className="food-name">
              {food.name}
            </Link>
            <span className="food-calories">{formatNutrient(food.calories_kcal)} kcal</span>
          </div>
          <div className="mt-4 flex space-x-4">
            <div className="food-macro">
              <span className="mr-1">🍖</span>
              <span className="food-macro-text">{formatNutrient(food.protein_g)}g</span>
            </div>
            <div className="food-macro">
              <span className="mr-1">🌾</span>
              <span className="food-macro-text">{formatNutrient(food.carbohydrate_g)}g</span>
            </div>
            <div className="food-macro">
              <span className="mr-1">🥑</span>
              <span className="food-macro-text">{formatNutrient(food.fat_g)}g</span>
            </div>
          </div>
          <div className="mt-3 text-left">
            <Link href={`/foods?category=${food.category.slug}`} className="food-category">
              {food.category.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FoodCard);
