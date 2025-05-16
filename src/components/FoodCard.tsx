// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Component imports
import { Link } from '@/components/common/Link';

function FoodCard({ food }) {
  return (
    <div key={food.id}>
      <div className="food-card">
        <Link
          href={`/foods/${food.id}`}
          className="food-thumb"
          style={{ 
            backgroundImage: `url('/assets/images/bomb.svg')`,
            backgroundPosition: `65% 45%`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `65%`,
          }}
        >
          {/*<span className="text-6xl">{food.thumb}</span>*/}
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <Link href={`/foods/${food.id}`} className="food-name">{food.name}</Link>
            <span className="food-calories">{Math.floor(food.calories_kcal ?? 0)} kcal</span>
          </div>
          <div className="flex mt-4 space-x-4">
            <div className="food-macro">
              <span className="mr-1">🍖</span>
              <span className="food-macro-text">{food.protein_g ?? 0}g</span>
            </div>
            <div className="food-macro">
              <span className="mr-1">🌾</span>
              <span className="food-macro-text">{food.carbs_g ?? 0}g</span>
            </div>
            <div className="food-macro">
              <span className="mr-1">🥑</span>
              <span className="food-macro-text">{food.fat_g ?? 0}g</span>
            </div>
          </div>
          <div className="mt-3 text-left">
            <Link
              href={`/foods?category=${food.category}`}
              className="food-category">
              {food.category_name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
