// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect } from 'react';
//import { useMemo } from 'react'

// 2. Asset imports
import { mockFoods } from "@/data/mockData";

// 3. Component imports
import { useNavigationService } from '@/services/navigation';
import { Link } from '@/components/common/Link';

function FoodDetail() {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareFood, setCompareFood] = useState(null);
  const [customServingSize, setCustomServingSize] = useState(100);

  const navigation = useNavigationService();

  const foodId = navigation.getParams().id ?? '';
  const food = mockFoods.find((food) => food.id === foodId);
  console.log('food', food);
  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between">
          <Link href="/foods" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left mr-2 h-4 w-4">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
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
                <li>Calories: {food.calories_kcal} kcal</li>
                <li>Protein: {food.protein_g} g</li>
                <li>Carbs: {food.carbs_g} g</li>
                <li>Fat: {food.fat_g} g</li>
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