// @ts-nocheck : JS compatible
import { Link } from '@/components/common/Link';

function FoodCard({ food }) {
  return (
    <div key={food.id}>
      <div className="food-card">
        <Link
          href={`/foods/${food.id}`}
          className="food-thumb">
          {/*<span className="text-6xl">{food.thumb}</span>*/}
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <Link href={`/foods/${food.id}`} className="food-name">{food.name}</Link>
            <span className="food-calories">{Math.floor(food.calories_kcal)} kcal</span>
          </div>
          <div className="flex mt-4 space-x-4">
            <div className="food-macro">
              <span className="mr-1">🍖</span>
              <span className="food-macro-text">{food.protein_g}g</span>
            </div>
            <div className="food-macro">
              <span className="mr-1">🌾</span>
              <span className="food-macro-text">{food.carbs_g}g</span>
            </div>
            <div className="food-macro">
              <span className="mr-1">🥑</span>
              <span className="food-macro-text">{food.fat_g}g</span>
            </div>
          </div>
          <div className="mt-3 text-left">
            <Link
              href={`foods/category/${food.category}`}
              className="food-category">
              {food.category}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
