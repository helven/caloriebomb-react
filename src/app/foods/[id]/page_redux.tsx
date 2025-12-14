// @ts-nocheck : JS compatible
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// React
import { useState, useEffect, useRef, useMemo } from 'react';

// State Management
import { useSelector, useDispatch } from "react-redux";
// import { addFoodComparison } from "@/tobe_deleted/foodComparison/slice";

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// Services
import { useNavigationService } from '@/services/navigation';

// Hooks
import { useFoods } from '@/hooks/useFoods';
import useOnClickOutside from '@/hooks/useOnClickOutside';

// Utils
import { formatNutrient } from '@/utils/formatters';

// Components
import { Link } from '@/components/common/Link';
import PageHeading from '@/components/common/PageHeading';
import ArrowProps from '@/components/props/ArrowProps';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { RootState } from "@/store/store";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const SERVING_SIZE_OPTIONS = [
  { value: 100, label: '100g (Default)' },
  { value: 10, label: '10g' },
  { value: 1, label: '1g' },
];

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
function FoodDetail() {
  // --- Hooks & Context ------------------------------------------------------
  const navigation = useNavigationService();
  const dispatch = useDispatch();
  const { fetchFoodById } = useFoods();

  // --- URL State ------------------------------------------------------------
  const foodId = Number(navigation.getParams().id ?? 0);

  // --- Local State ----------------------------------------------------------
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareFood, setCompareFood] = useState(null);

  const [servingSize, setServingSize] = useState(100);
  const servingSizeOptionRef = useRef(null);
  const [showServingSizeOptions, setShowServingSizeOptions] = useState(false);

  // --- Redux Selectors ------------------------------------------------------
  // Get food data from redux store
  const foodData = useSelector((state: RootState) => 
    state.foods.byId[foodId]
  );

  // Get food comparison data from redux store
  const foodComparison = useSelector((state: RootState) => {
    return state.foodComparison
  });

  // --- Derived / Computed ---------------------------------------------------
  const food = useMemo(() => {
    return foodData ? {
      ...foodData,
      serving_calories_kcal: foodData.calories_kcal * (servingSize / 100),
      serving_protein_g: foodData.protein_g * (servingSize / 100),
      serving_carbohydrate_g: foodData.carbohydrate_g * (servingSize / 100),
      serving_fat_g: foodData.fat_g * (servingSize / 100),
      serving_saturated_fat_g: foodData.saturated_fat_g * (servingSize / 100),
      serving_monounsaturated_fat_g: foodData.monounsaturated_fat_g * (servingSize / 100),
      serving_polyunsaturated_fat_g: foodData.polyunsaturated_fat_g * (servingSize / 100),
      serving_cholesterol_mg: foodData.cholesterol_mg * (servingSize / 100),
      serving_fiber_g: foodData.fiber_g * (servingSize / 100),
    } : null
  }, [foodData, servingSize]);

  // --- Effects --------------------------------------------------------------
  useOnClickOutside(servingSizeOptionRef, () => setShowServingSizeOptions(false));

  // Fetch food by ID from API (hook to redux store) on foodId changes
  useEffect(() => {
    fetchFoodById(foodId);
  }, [foodId]);

  useEffect(() => {
    // console.log('Updated state:', foodComparison);
  }, [foodComparison]);

  // --- Handlers -------------------------------------------------------------
  function handleAddToCompare() {
    // dispatch(addFoodComparison(food));
  }

  // --- Render ---------------------------------------------------------------
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
            <PageHeading
              title={food?.name}
              description={food?.description ?? ''}
            />

            <section className="food-detail-card shadow-none">
            {food?.image && ''}
            <div
              className="food-thumb"
              style={{
                backgroundImage: `url('/assets/images/bomb.svg')`,
                backgroundPosition: `65% 45%`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `65%`,
              }}></div>
          </section>

            <section className="food-detail-card p-6">
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
                        {SERVING_SIZE_OPTIONS
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
            </section>

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

            {/*<div>
                <div className="flex mt-8 justify-center items-center space-x-4">
                  <button
                    onClick={() => handleAddToCompare()}
                    className="btn btn-primary"
                  >
                    Add to Compare
                  </button>
                </div>
            </div>*/}
          </>
        ) : (
          <>
            {/*<div>No Food</div>*/}
          </>
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