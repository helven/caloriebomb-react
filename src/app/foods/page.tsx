// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect } from 'react';
//import { useMemo } from 'react'

// 2. Asset imports
import { mockFoods } from "@/data/mockData";

// 3. Component imports
import { Link } from '@/components/common/Link';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/app/home/components/SearchBar';

function FoodList() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setFoods(mockFoods);
  }, []);

  return (
    <>
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 dark:text-white">Find Your Food's Kaboom <span className="inline-block">💣</span></h2>
        <p className="mb-8">Discover the nutritional content of your favorite foods</p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <SearchBar />
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">All Foods</h1>
          <button className="btn btn-secondary flex items-center px-3 py-2 rounded-md shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal mr-2">
              <line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line>
              <line x1="8" x2="3" y1="12" y2="12"></line>
              <line x1="21" x2="16" y1="20" y2="20"></line>
              <line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line>
              <line x1="16" x2="16" y1="18" y2="22"></line>
            </svg>
            Filters
          </button>
        </div>
        <div className="bg-card rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" data-sharkid="__1">
              <option value="All">All</option>
              <option value="Fruits">Fruits</option><option value="Meat">Meat</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Healthy">Healthy</option>
              <option value="Grains">Grains</option>
            </select>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" data-sharkid="__2">
                <option value="name">Name</option>
                <option value="calories">Calories</option>
                <option value="protein">Protein</option>
                <option value="carbs">Carbs</option>
                <option value="fat">Fat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" data-sharkid="__3">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods
            .sort(() => 0.5 - Math.random())
            .map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
        </div>
      </section>
    </>
  );
}

export default FoodList