// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- React ---
import { useEffect, useState } from 'react';

// --- Redux ---
import { useSelector } from 'react-redux';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Services ---
import { useNavigationService } from '@/services/navigation';

// --- Hooks ---
// The hook fetches from the API, then dispatches setFoods / setListStatus to the slice by hand
import { useFoodsRedux } from '@/hooks/useFoodsRedux';

// --- Components ---
import ListingFilter from '@/app/foods/components/ListingFilter';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/listing/Pagination';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { Food } from '@/types';
import type { RootState } from '@/store/store';

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
// Uses the app's Redux store from main.tsx, so no <Provider> in this file
function FoodList() {
  // --- Hooks & Context ---
  const { fetchFoods } = useFoodsRedux();
  const foodsState = useSelector((rootState: RootState) => {
    return rootState.foods;
  });

  const navigation = useNavigationService();

  // --- Filter Section ---
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // --- Filter & Sorting ---
  const search: string = navigation.getQueryString('search') || '';
  const category: string = navigation.getQueryString('category') || '';
  const sortBy: string = navigation.getQueryString('sortby') || 'name';
  const sortOrder: 'asc' | 'desc' = (navigation.getQueryString('sortorder') as 'asc' | 'desc') || 'asc';

  // --- Pagination ---
  const [totalItems, setTotalItems] = useState(0);
  const page: number = Number(navigation.getQueryString('page')) || 1;
  const perPage: number = Number(navigation.getQueryString('per_page')) || 9;
  const totalPages: number = Math.ceil(totalItems / perPage);
  const pagingStartIndex: number = Math.max(0, page - 5);
  const pagingEndIndex: number = Math.min(totalPages - 1, pagingStartIndex + 5);

  // fetchFoods reads the URL itself, so the dependencies are the URL values.
  // fetchFoods is a new function on every render, so it is not a dependency.
  useEffect(() => {
    const loadFoods = async () => {
      const total = await fetchFoods();
      setTotalItems(total);
    };

    loadFoods();
  }, [page, perPage, sortBy, sortOrder, category, search]);

  // --- Render ---
  return (
    <>
      {/* --- Page Header --- */}
      <section className="page-header text-center">
        <h2 className="mb-4 text-4xl font-bold">
          Find Your Food's Kaboom <span className="inline-block">💣</span>
        </h2>
        <p className="mb-8">Discover the nutritional content of your favorite foods</p>
        <div className="mx-auto max-w-md">
          <div className="relative">
            <SearchBar handleUrlSearch={true} />
          </div>
        </div>
      </section>

      <section className="container mx-auto mb-8 grid grid-cols-1 gap-8 px-4">
        {/* --- Title & Filter Toggle --- */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">All Foods</h1>
              <div className="text-left text-sm">{/*Showing {foods.length} of {totalItems} foods*/}</div>
            </div>
            <button
              className="btn btn-secondary flex items-center rounded-md px-3 py-2 shadow-sm"
              onClick={() => {
                setIsFilterVisible(!isFilterVisible);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sliders-horizontal mr-2"
              >
                <line x1="21" x2="14" y1="4" y2="4"></line>
                <line x1="10" x2="3" y1="4" y2="4"></line>
                <line x1="21" x2="12" y1="12" y2="12"></line>
                <line x1="8" x2="3" y1="12" y2="12"></line>
                <line x1="21" x2="16" y1="20" y2="20"></line>
                <line x1="12" x2="3" y1="20" y2="20"></line>
                <line x1="14" x2="14" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="10" y2="14"></line>
                <line x1="16" x2="16" y1="18" y2="22"></line>
              </svg>
              Filters
            </button>
          </div>
        </div>

        {/* --- Filters --- */}
        <ListingFilter
          className={`${isFilterVisible ? '' : 'hidden'}`}
          categoryHandler={{
            value: category,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value) {
                navigation.setQueryString('category', e.target.value);
              } else {
                navigation.removeQueryString('category');
              }
            },
          }}
          sortBy={{
            value: sortBy,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value) {
                navigation.setQueryString('sortby', e.target.value);
              } else {
                navigation.removeQueryString('sortby');
              }
            },
          }}
          sortOrder={{
            value: sortOrder,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value) {
                navigation.setQueryString('sortorder', e.target.value);
              } else {
                navigation.removeQueryString('sortorder');
              }
            },
          }}
        />

        {/* --- Food Grid --- */}
        <section>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {foodsState.list.ids.map((id) => {
              const food: Food | undefined = foodsState.foodsById[id]?.food;
              return (food) ? <FoodCard key={id} food={food} /> : '';
            })}
          </div>
        </section>

        {/* --- Pagination --- */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page: number) => navigation.setQueryString('page', String(page))}
          onItemsPerPageChange={(perPage: number) => navigation.setQueryString('per_page', String(perPage))}
          itemsPerPage={perPage}
          pagingStartIndex={pagingStartIndex}
          pagingEndIndex={pagingEndIndex}
          textPerPage="Foods per page"
        />
      </section>
    </>
  );
}

export default FoodList;
