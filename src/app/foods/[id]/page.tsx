// @ts-nocheck : JS compatible
// 1. React and Next.js core imports
import { useState, useEffect, useRef } from 'react';

// 2. Third-party library imports
// (none currently)

// 3. Project services and utilities
import { useNavigationService } from '@/services/navigation';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { formatNutrient } from '@/utils/formatters';
import { mockFoods } from "@/data/mockData";

// 4. Components and UI elements
import { Link } from '@/components/common/Link';
import ArrowProps from '@/components/props/ArrowProps';

function FoodDetail() {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareFood, setCompareFood] = useState(null);

  const [servingSize, setServingSize] = useState(100);
  const servingSizeOptionRef = useRef(null);
  const [showServingSizeOptions, setShowServingSizeOptions] = useState(false);

  const navigation = useNavigationService();

  const foodId = navigation.getParams().id ?? '';
  const [food, setFood] = useState(mockFoods.find((food) => food.id === foodId));
  
  useOnClickOutside(servingSizeOptionRef, () => setShowServingSizeOptions(false));

  useEffect(() => {
    setFood({
      ...food,
      serving_calories_kcal: food.calories_kcal * (servingSize / 100),
      serving_protein_g: food.protein_g * (servingSize / 100),
      serving_carbohydrate_g: food.carbohydrate_g * (servingSize / 100),
      serving_fat_g: food.fat_g * (servingSize / 100),
      serving_saturated_fat_g: food.saturated_fat_g * (servingSize / 100),
      serving_monounsaturated_fat_g: food.monounsaturated_fat_g * (servingSize / 100),
      serving_polyunsaturated_fat_g: food.polyunsaturated_fat_g * (servingSize / 100),
      serving_cholesterol_mg: food.cholesterol_mg * (servingSize / 100),
      serving_fiber_g: food.fiber_g * (servingSize / 100),
    });
  }, [servingSize]);

  const servingSizeOptions = [
    { value: 100, label: '100g (Default)' },
    { value: 10, label: '10g' },
    { value: 1, label: '1g' },
  ]

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
            <section>
              <h1 className="text-3xl font-bold dark:text-white">{food.name}</h1>
              <p className="text-lg text-gray-600">{food.description}</p>
            </section>

            <section className="food-detail-card shadow-none">
              {(food.image && food.image !== '') ? (''
              ) : ('')}
              <div
                className="food-thumb"
                style={{
                  backgroundImage: `url('/assets/images/bomb.svg')`,
                  backgroundPosition: `65% 45%`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `65%`,
                }}></div>
            </section>

            <div className="food-detail-card p-6">
              <div className="flex items-center justify-between">
                <label className="font-medium text-lg dark:text-white">Serving Size:</label>
                <div className="bg-card1 relative inline-block">
                  <div className="flex items-center border dark:border-gray-600 pe-1">
                    <input
                      type="number"
                      className="bg-card1 dark:text-gray-300 w-16 px-2 py-1.5 border-none focus:ring-0 outline-none text-right"
                      min="0.1"
                      step="0.1"
                      value={servingSize}
                      onChange={(e) => setServingSize(Number(e.target.value))}
                    />
                    <span className="pr-2 dark:text-gray-300">g</span>
                    <button
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300"
                      onClick={() => { setShowServingSizeOptions(!showServingSizeOptions) }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                  {(showServingSizeOptions) ? (
                    <div
                      ref={servingSizeOptionRef}
                      className="bg-card1 absolute right-0 mt-1 w-36 border dark:border-gray-600 shadow-lg z-10">
                      <div className="py-1">
                        {servingSizeOptions
                          .map((servingSize) => (
                            <button
                              key={servingSize.value}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-300"
                              onClick={() => {
                                setServingSize(servingSize.value);
                                setShowServingSizeOptions(false);
                              }}
                            >{servingSize.label}</button>
                          ))}
                      </div>
                    </div>
                  ) : ('')}
                </div>
              </div>
            </div>

            <section className="food-detail-card p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card3 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calories (kcal)</div>
                  <div className="text-xl font-bold text-orange-500 flex items-center">{formatNutrient(food.serving_calories_kcal)}</div>
                </div>
                <div className="bg-card3 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</div>
                  <div className="text-xl font-bold text-red-500 flex items-center">
                    <span className="mr-1">🍖</span>{formatNutrient(food.serving_protein_g)}g
                  </div>
                </div>
                <div className="bg-card3 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carbs</div>
                  <div className="text-xl font-bold text-yellow-500 flex items-center">
                    <span className="mr-1">🌾</span>{formatNutrient(food.serving_carbs_g)}g
                  </div>
                </div>
                <div className="bg-card3 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fat</div>
                  <div className="text-xl font-bold text-green-500 flex items-center">
                    <span className="mr-1">🥑</span>{formatNutrient(food.serving_fat_g)}g
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Fiber</span>
                  <span className="font-medium dark:text-white">{formatNutrient(food.serving_fiber_g)} g</span>
                </div>
                {/*<div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Sugar</span>
                  <span className="font-medium dark:text-white">{formatNutrient(food.serving_fat_g)} g</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Sodium</span>
                  <span className="font-medium dark:text-white">{formatNutrient(food.serving_fat_g)} mg</span>
                </div>*/}
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Cholesterol</span>
                  <span className="font-medium dark:text-white">{formatNutrient(food.serving_cholesterol_mg)} mg</span>
                </div>
              </div>
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