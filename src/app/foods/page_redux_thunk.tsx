// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- React ---
import { useEffect, useState } from 'react';

// --- Redux ---
import { useDispatch, useSelector } from 'react-redux';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Services ---
import { API_ROUTES } from '@/constants/apiRoutes';
import { useNavigationService } from '@/services/navigation';

// --- Redux Thunks ---
// fetchFoods lives in foodsThunk.ts. foodsSlice.ts handles its pending / fulfilled / rejected actions.
import { fetchFoods } from '@/store/slices/foods/foodsThunk';

// --- Components ---
import ListingFilter from '@/app/foods/components/ListingFilter';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/listing/Pagination';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { Food } from '@/types';
import type { AppDispatch, RootState } from '@/store/store';

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
// Uses the app's Redux store from main.tsx, so no <Provider> in this file
function FoodList() {
  // --- Hooks & Context ---
  const dispatch = useDispatch<AppDispatch>();
  const foodsState = useSelector((rootState: RootState) => {
    return rootState.foods;
  });
 
  const queryParams = new URLSearchParams();
  const navigation = useNavigationService();

  // --- Data Source ---
  //const [foods, setFoods] = useState([]);

  // --- Filter Section ---
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  // --- Filter & Sorting ---
  const search: string = navigation.getQueryString('search') || '';
  const category: string = navigation.getQueryString('category') || '';
  const sortBy: string = navigation.getQueryString('sortby') || 'name';
  const sortOrder: 'asc' | 'desc' = (navigation.getQueryString('sortorder') as 'asc' | 'desc') || 'asc';

  // --- Pagination ---
  const totalItems: number = foodsState.list.totalItems;
  const page: number = Number(navigation.getQueryString('page')) || 1;
  const perPage: number = Number(navigation.getQueryString('per_page')) || 9;
  const totalPages: number = Math.ceil(totalItems / perPage);
  const pagingStartIndex: number = Math.max(0, page - 5);
  const pagingEndIndex: number = Math.min(totalPages - 1, pagingStartIndex + 5);

  if (sortBy) queryParams.append('sortby', sortBy);
  if (sortOrder) queryParams.append('sortorder', sortOrder);
  if (perPage) queryParams.append('per_page', perPage.toString());
  if (page) queryParams.append('page', page.toString());
  if (category) queryParams.append('category_slug', category.toString());
  if (search) queryParams.append('search', search.toString());

  const apiUrl = API_ROUTES.FOODS.BASE + `?${queryParams.toString()}`;

  useEffect(() => {
    dispatch(fetchFoods(apiUrl));
  }, [dispatch, apiUrl]);

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
