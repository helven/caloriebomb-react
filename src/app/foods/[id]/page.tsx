// @ts-nocheck : JS compatible
// 1. React and Next.js core imports
import { useState, useEffect } from 'react';

// 2. Third-party library imports
// (none currently)

// 3. Project services and utilities
import { useNavigationService } from '@/services/navigation';
import { formatNutrient } from '@/utils/formatters';
import { mockFoods } from "@/data/mockData";

// 4. Components and UI elements
import { Link } from '@/components/common/Link';
import ArrowProps from '@/components/props/ArrowProps';

function FoodDetail() {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareFood, setCompareFood] = useState(null);
  const [customServingSize, setCustomServingSize] = useState(100);

  const navigation = useNavigationService();

  const foodId = navigation.getParams().id ?? '';
  const food = mockFoods.find((food) => food.id === foodId);

  return (
    <>
      <section className="page-breadcrumb">
        <div className="mb-6 flex justify-between">
          <Link href="/foods" className="flex items-center">
            <ArrowProps type="left" />
            Back
          </Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 mb-8 px-4">
        <section>
          <h1 className="text-3xl font-bold dark:text-white">{food.name}</h1>
          <p className="text-lg text-gray-600">{food.description}</p>
        </section>

        {(isComparing && food && compareFood) ? (
          <>
            {/* First Food */}
            <div>Food 1</div>
            {/* Second Food */}
            <div>Food 2</div>
          </>
        ) : food ? (
          /* Food */
          <>
            <section className="food-detail-card">
              <div
                className="food-thumb"
                style={{
                  backgroundImage: `url('/assets/images/bomb.svg')`,
                  backgroundPosition: `65% 45%`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `65%`,
                }}></div>
            </section>
            {(food.image && food.image !== '') ? (''
            ) : ('')}
            <section className="food-detail-card p-6">
              <h2 className="text-2xl font-bold">Nutrition Facts</h2>
              <ul>
                <li>Calories: {formatNutrient(food.calories_kcal)} kcal</li>
                <li>Protein: {formatNutrient(food.protein_g >= 1)}g</li>
                <li>Carbs: {formatNutrient(food.carbs_g)}g</li>
                <li>Fat: {formatNutrient(food.fat_g)}g</li>
              </ul>
            </section>

            <div>
              {/*<div className="flex mt-8 justify-center items-center space-x-4">
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="btn btn-primary"
                >
                  Compare
                </button>
              </div>*/}
            </div>
          </>
        ) : (
          /* No Food */
          <div>No Food</div>
        )}



      </div>

      <div>
        <section className="container mx-auto px-4 py-8">

        </section>
      </div>
    </>
  );
}

export default FoodDetail;