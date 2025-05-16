// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect } from 'react';
//import { useMemo } from 'react'

// 2. Asset imports
import { mockFoods } from "@/data/mockData";

// 3. Component imports
import { Link } from '@/components/common/Link';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';

function Home() {
  const [foods, setFoods] = useState([]);

  const categories = [
    { href: 'meat', emoji: '🥩', name: 'Meat' },
    { href: 'vegetable', emoji: '🥦', name: 'Vegetable' },
    { href: 'fruit', emoji: '🍎', name: 'Fruit' },
    { href: 'dessert', emoji: '🍰', name: 'Dessert' },
  ];

  useEffect(() => {
    setFoods(mockFoods);
  }, []);


  //document.getElementById('aaa')?.style.display = 'none';

  return (
    <>
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 dark:text-white">Find Your Food's Kaboom <span className="inline-block">💣</span></h2>
        <p className="mb-8">Discover the nutritional content of your favorite foods</p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <SearchBar handleUrlSearch="true" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
          <span>🔥</span> Featured Foods <span>🔥</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods
            .sort(() => 0.5 - Math.random())
            .slice(0, 6)
            .map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
        </div>
        <div className="text-center mt-8">
          <Link href={`/foods`} className="btn btn-primary">View All Foods</Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={`/foods?category=${category.href}`}
              className="food-category-card">
              <div className="rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h4 className="food-category-name">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home
