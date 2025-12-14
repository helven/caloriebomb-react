// @ts-nocheck : JS compatible
// SERVER-SIDE PAGINATION VERSION
// 1. React and React ecosystem imports
import { useState, useEffect } from 'react';

// 2. Asset imports

// 3. Project services and utilities
import { useNavigationService } from '@/services/navigation';
import { foodService } from '@/services/api/food/foodService';

// 4. Components and UI elements
import { Link } from '@/components/common/Link';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/listing/Pagination';
import ListingFilter from '@/app/foods/components/ListingFilter';

function FoodList() {
  const navigation = useNavigationService(); // Calling useSearchParams() (inside useNavigationService) subscribes this component to URL changes

  // data source
  const [foods, setFoods] = useState([]);

  // Filter section
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // Filter, sorting
  const category: string = navigation.getQueryString('category') || '';
  const search: string = navigation.getQueryString('search') || '';
  const sortBy: string = navigation.getQueryString('sortby') || 'name';
  const sortOrder: 'asc' | 'desc' = navigation.getQueryString('sortorder') as 'asc' | 'desc' || 'asc';

  // Pagination
  const [totalItems, setTotalItems] = useState(0);
  const currentPage: number = Number(navigation.getQueryString('page')) || 1;
  const itemsPerPage: number = Number(navigation.getQueryString('per_page')) || 9;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const pagingStartIndex: number = Math.max(0, currentPage - 5);
  const pagingEndIndex: number = Math.min(totalPages - 1, pagingStartIndex + 5);

  // Fetch foods data from server with all filters/sorting/pagination
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await foodService.getFoods({
          page: currentPage,
          perpage: itemsPerPage,
          sortby: sortBy,
          sortorder: sortOrder,
          category: category,
          search: search
        });
        const foods = response.data;
        if (!foods.success) {
          return;
        }

        // Calculate with fetched data from server
        const fetchedTotal = foods.data.total;
        const fetchedTotalPages = Math.ceil(fetchedTotal / itemsPerPage);
        
        // When user navigate to page beyond the total pages, reset to page 1
        if (currentPage > fetchedTotalPages && fetchedTotalPages > 0) {
          navigation.setQueryString('page', '1');
          return; // Exit early, new fetch will happen with page=1
        }

        setFoods(foods.data.items);
        setTotalItems(foods.data.total); // Server provides total count
      } catch (error) {
        console.error('Error fetching food: ', error);
      }
    };

    fetchFoods();
  }, [currentPage, itemsPerPage, sortBy, sortOrder, category, search]); // Refetch when any param changes

  return (
    <>
      <section className="page-header text-center ">
        <h2 className="text-4xl font-bold mb-4">Find Your Food's Kaboom <span className="inline-block">💣</span></h2>
        <p className="mb-8">Discover the nutritional content of your favorite foods</p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <SearchBar handleUrlSearch="true" />
          </div>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 gap-8 mb-8 px-4">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">All Foods</h1>
              <div className="text-left text-sm">
                Showing {foods.length} of {totalItems} foods
              </div>
            </div>
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
        </div>

        <ListingFilter
          className={`${isFilterVisible ? '' : 'hidden'}`}
          category={{
            value: category,
            onChange: (e) => {
              if (e.target.value) {
                navigation.setQueryString('category', e.target.value);
              } else {
                navigation.removeQueryString('category');
              }
            }
          }}

          sortBy={{
            value: sortBy,
            onChange: (e) => {
              if (e.target.value) {
                navigation.setQueryString('sortby', e.target.value);
              } else {
                navigation.removeQueryString('sortby');
              }
            }
          }}

          sortOrder={{
            value: sortOrder,
            onChange: (e) => {
              if (e.target.value) {
                navigation.setQueryString('sortorder', e.target.value);
              } else {
                navigation.removeQueryString('sortorder');
              }
            }
          }}
        />

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => navigation.setQueryString('page', String(page))}
          onItemsPerPageChange={(perPage) => navigation.setQueryString('per_page', String(perPage))}
          itemsPerPage={itemsPerPage}
          pagingStartIndex={pagingStartIndex}
          pagingEndIndex={pagingEndIndex}
          textPerPage="Foods per page"
        />
      </section>
    </>
  );
}

export default FoodList