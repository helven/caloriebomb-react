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
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between">
          <Link href="/foods" className="flex items-center">
            <ArrowProps type="left" />
            Back
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {(isComparing && food && compareFood) ? (
          <>
            {/* First Food */}
            <div>Food 1</div>
            {/* Second Food */}
            <div>Food 2</div>
          </>
        ) : food ? (
          /* Food */
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col items-start">
                <h1 className="text-4xl font-bold mb-2">{food.name}</h1>
                <p className="text-lg text-gray-600">{food.description}</p>
              </div>
            </div>
            {(food.image && food.image !== '') ? (
              <div className="mt-8">
                <img src={food.image} alt={food.name} className="w-full h-auto" />
              </div>
            ) : ('')}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Nutrition Facts</h2>
              <ul>
                <li>Calories: {formatNutrient(food.calories_kcal)} kcal</li>
                <li>Protein: {formatNutrient(food.protein_g >= 1)}g</li>
                <li>Carbs: {formatNutrient(food.carbs_g)}g</li>
                <li>Fat: {formatNutrient(food.fat_g)}g</li>
              </ul>
            </div>
            {/*<div className="flex mt-8 justify-center items-center space-x-4">
              <button
                onClick={() => setShowCompareModal(true)}
                className="btn btn-primary"
              >
                Compare
              </button>
            </div>*/}
          </div>
        ) : (
          /* No Food */
          <div>No Food</div>
        )}
      </section>
    </>
  );
}

export default FoodDetail;