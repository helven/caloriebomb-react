// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect, useMemo, useRef } from 'react';

// 2. Asset imports
import { mockFoods } from "@/data/mockData";
import useAppStore from '@/stores/useAppStore';

// 3. Project services and utilities
import { useNavigationService } from '@/services/navigation';

// 4. Components and UI elements
import { Link } from '@/components/common/Link';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import Pagingation from '@/components/listing/Pagingation';

function FoodList() {
  const navigation = useNavigationService();
  const { globalSearchQuery, setGlobalSearchQuery } = useAppStore();
  const [category, setCategory] = useState(navigation.getQueryString('category') || '');
  const [sortBy, setSortBy] = useState(navigation.getQueryString('sortby') || 'name');
  const [sortOrder, setSortOrder] = useState(navigation.getQueryString('sortorder') || 'asc');
  const filterRef = useRef(null);

  const [foods, setFoods] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(() => {
    const page = navigation.getQueryString('page');
    return page && Number(page) > 0 ? Number(page) : 1;
  });
  const [totalPages, setTotalPages] = useState(9);

  // Filter food
  const filteredAndSortedFoods = useMemo(() => {
    const filtered = foods
      .filter(food => {
        // Check category
        if (category && category !== '') {
          if (food.category !== category) {
            return false;
          }
        }

        // Check search query
        if (globalSearchQuery && globalSearchQuery !== '') {
          return food.name.toLowerCase().includes(globalSearchQuery.toLowerCase());
        }

        return true;
      })
      .sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

    return filtered;
  }, [foods, category, sortBy, sortOrder, globalSearchQuery]);

  // Paginate food
  const paginatedFoods = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filteredAndSortedFoods.slice(start, end);
  }, [filteredAndSortedFoods, currentPage, itemsPerPage]);

  const pagingStartIndex = Math.max(0, currentPage - 5);
  const pagingEndIndex = Math.min(totalPages - 1, pagingStartIndex + 5);

  // Set mock data to foods state
  useEffect(() => {
    setFoods(mockFoods);
  }, []);

  // Calculate total pages separately to react to itemsPerPage changes
  useEffect(() => {
    setTotalPages(Math.ceil(filteredAndSortedFoods.length / itemsPerPage));
  }, [filteredAndSortedFoods, itemsPerPage]);

  // When user nagivate to page beyond the total pages, reset to page 1
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, itemsPerPage]);

  return (
    <>
      <section className="page-header text-center ">
        <h2 className="text-4xl font-bold mb-4 dark:text-white">Find Your Food's Kaboom <span className="inline-block">💣</span></h2>
        <p className="mb-8">Discover the nutritional content of your favorite foods</p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <SearchBar handleUrlSearch="true" />
          </div>
        </div>
      </section>

      <div className="container mx-auto grid grid-cols-1 gap-8 mb-8 px-4">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold dark:text-white">All Foods</h1>
            <button
              className="btn btn-secondary flex items-center px-3 py-2 rounded-md shadow-sm"
              onClick={() => {
                setIsFilterVisible(!isFilterVisible);
              }}
            >
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
          <div className="text-left text-sm text-gray-600 dark:text-gray-400">
            Showing {paginatedFoods.length} of {filteredAndSortedFoods.length} foods
          </div>
        </div>


        <div ref={filterRef}
          className={`${isFilterVisible ? '' : 'hidden'} bg-card rounded-lg shadow-md p-4`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value) {
                  navigation.updateQueryString('category', e.target.value);
                } else {
                  navigation.removeQueryString('category');
                }
              }}
            >
              <option value="">All</option>
              <option value="beverage">Beverage</option>
              <option value="condiments">Condiments</option>
              <option value="cream_crackers">Cream Crackers</option>
              <option value="dairy">Dairy</option>
              <option value="dessert">Dessert</option>
              <option value="fruit">Fruit</option>
              <option value="grain">Grain</option>
              <option value="meat">Meat</option>
              <option value="misc">Misc</option>
              <option value="oils-fats">Oils Fats</option>
              <option value="seafood">Seafood</option>
              <option value="snack">Snack</option>
              <option value="vegetable">Vegetable</option>
            </select>
          </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  if (e.target.value) {
                    navigation.updateQueryString('sortby', e.target.value);
                  } else {
                    navigation.removeQueryString('sortby');
                  }
                }}
              >
                <option value="name">Name</option>
                <option value="calories_kcal">Calories</option>
                <option value="protein_g">Protein</option>
                <option value="carbs_g">Carbs</option>
                <option value="fat_g">Fat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  if (e.target.value) {
                    navigation.updateQueryString('sortorder', e.target.value);
                  } else {
                    navigation.removeQueryString('sortorder');
                  }
                }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedFoods
              .map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
          </div>
        </section>

        <Pagingation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          pagingStartIndex={pagingStartIndex}
          pagingEndIndex={pagingEndIndex}
          textPerPage="Foods per page"
        />
      </div>
    </>
  );
}

export default FoodList