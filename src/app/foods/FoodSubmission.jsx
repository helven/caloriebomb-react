// @ts-nocheck : JS compatible
// 1. React and Next.js core imports
import { useState, useEffect, useRef } from 'react';

// 2. Third-party library imports
// (none currently)

// 3. Project services and utilities
import { useNavigationService } from '@/services/navigation';
import { mockFoods } from "@/data/mockData";

// 4. Components and UI elements
import { Link } from '@/components/common/Link';
import PageHeading from '@/components/common/PageHeading';
import ArrowProps from '@/components/props/ArrowProps';

const FoodSubmission = () => {
  const [food, setFood] = useState({
    name: '',
    calories_kcal: '',
    protein_g: '',
    carbohydrate_g: '',
    fat_g: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
  };

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
        <PageHeading
          title="Submit a Food"
          description="Become a Food Explorer! Found something delicious that's not in our database?
            Add it here and join our growing community of food detectives.
            Don't worry if you're not a nutrition expert - just grab that nutrition label and let's make some food magic happen!"
        />

        <section className="food-detail-card p-6">
          <form className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Food Name*</label>
                <input className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300" placeholder="e.g., Banana" type="text" name="name" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category*</label>
                <select name="category_id" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300">
                  <option value="">Select a category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Meat">Meat</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Grains">Grains</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Food Emoji</label>
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-700 h-12 w-12 rounded-md flex items-center justify-center text-2xl mr-3">🍽️</div>
                  <select name="emoji" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <option value="🍎">🍎 Apple</option>
                    <option value="🍌">🍌 Banana</option>
                    <option value="🥩">🥩 Meat</option>
                    <option value="🍗">🍗 Chicken</option>
                    <option value="🥑">🥑 Avocado</option>
                    <option value="🍚">🍚 Rice</option>
                    <option value="🍕">🍕 Pizza</option>
                    <option value="🍔">🍔 Burger</option>
                    <option value="🥗">🥗 Salad</option>
                    <option value="🍞">🍞 Bread</option>
                    <option value="🥛">🥛 Milk</option>
                    <option value="🧀">🧀 Cheese</option>
                    <option value="🍳">🍳 Egg</option>
                    <option value="🍤">🍤 Shrimp</option>
                    <option value="🍣">🍣 Sushi</option>
                    <option value="🍇">🍇 Grapes</option>
                    <option value="🍊">🍊 Orange</option>
                    <option value="🍓">🍓 Strawberry</option>
                    <option value="🥦">🥦 Broccoli</option>
                    <option value="🥕">🥕 Carrot</option>
                    <option value="🍽️">🍽️ Generic Food</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Calories (kcal)*</label>
                <input min="0" step="0.1" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300" type="number" name="calories_kcal" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Energy (kJ) - Auto-calculated</label>
                <input readonly="" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600" type="number" name="energy_kj" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Calculated using 1 kcal = 4.184 kJ</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Macronutrients (g per 100g)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Protein (g)</label>
                    <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="protein_g" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Carbohydrate (g)</label>
                    <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="carbohydrate_g" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Total Fat (g)</label>
                    <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="fat_g" />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Fat Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Saturated Fat (g)</label>
                    <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="saturated_fat_g" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Monounsaturated Fat (g)</label>
                    <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="monounsaturated_fat_g" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Polyunsaturated Fat (g)</label>
                    <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="polyunsaturated_fat_g" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Fiber (g)</label>
                <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="fiber_g" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Cholesterol (mg)</label>
                <input min="0" step="0.1" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" type="number" name="cholesterol_mg" />
              </div>
              <div className="col-span-2 mt-4">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Food Images</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Upload up to 5 images of this food item. The first image will be used as the cover.</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="relative aspect-square border border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700">
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                      <div className="text-orange-500 dark:text-orange-400 text-3xl mb-1">+</div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Add Image</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">(1/5)</span>
                      <input accept="image/*" className="hidden" type="file" />
                    </label>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Supported formats: JPG, PNG, GIF</p>
                  <p>Maximum file size: 5MB per image</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex justify-center gap-4">
              <button type="submit" className="btn btn-primary">Submit Food</button>
              <button type="button" className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default FoodSubmission;