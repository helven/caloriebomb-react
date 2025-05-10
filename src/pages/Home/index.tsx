// @ts-nocheck : JS compatible
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useMemo } from 'react'
import { mockFoods } from "../../data/mockData";
import SearchButton from './components/SearchButton';
import FoodCard from '../../components/FoodCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setFoods(mockFoods);
  }, []);


  //document.getElementById('aaa')?.style.display = 'none';

  return (
    <>
      <section id="aaa" className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 dark:text-white">Find Your Food's Kaboom <span className="inline-block">💣</span></h2>
        <p className="mb-8">Discover the nutritional content of your favorite foods</p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for any food..."
              className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              type="text"
            />
            <SearchButton className="absolute" />
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
          <Link to={`foods`} className="btn btn-primary" href="/foods">View All Foods</Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a className="food-category-card" href="/category/fruits">
            <div className="rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🍎</div>
              <h4 className="food-category-name">Fruits</h4>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

export default Home
