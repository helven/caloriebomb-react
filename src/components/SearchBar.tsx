// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect, useRef } from 'react';

// 2. Asset imports
import useAppStore from '@/stores/useAppStore';

// 3. Component imports
import { useNavigationService } from '@/services/navigation';
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';

function SearchBar({ handleUrlSearch = false }) {
  const navigation = useNavigationService();
  const { globalSearchQuery, setGlobalSearchQuery } = useAppStore();
  const [localSearchValue, setLocalSearchValue] = useState(globalSearchQuery); // set localSearchValue from globalSearchQuery

  const { performSearch } = useSearch();
  const timerRef = useRef(null);

  useEffect(() => {
    if (handleUrlSearch) { // only handle URL search when only allowed one is reacting to the URL search
      handleSearchQueryString();
    }
  }, []);

  // Search Query String handler
  const handleSearchQueryString = () => {
    const search = navigation.getQueryString('search');
    if (search) {
      setLocalSearchValue(search);
      performSearch(search);
    }
  };

  // Search button click handler
  const handleSearchClick = () => {
    performSearch(localSearchValue);
  };

  // Search input change handler
  const handleInputChange = (value) => {
    setLocalSearchValue(value);

    if (value === '') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        performSearch(value);
        timerRef.current = null;
      }, 100);
    }
  };

  // Search input key down handler
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch(localSearchValue);
    }
  }

  return (
    <>
      <input
        type="text"
        value={localSearchValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        placeholder="Search for any food..."
        className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      />
      <SearchButton
        className="absolute btn-primary text-white"
        width="24"
        height="24"
        onClick={handleSearchClick}
      />
    </>
  );
}

export default SearchBar;
