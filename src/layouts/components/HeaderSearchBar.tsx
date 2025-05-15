// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect, useRef } from 'react';

// 2. Asset imports
import useAppStore from '@/stores/useAppStore';

// 3. Component imports
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';

function HeaderSearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery); // set localSearchValue from searchQuery

  const { performSearch } = useSearch();
  const timerRef = useRef(null);

  // Sync local state with store when searchQuery changes
  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

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
        placeholder="Search for foods..."
        className="pl-3 pr-10 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-64"
      />
      <SearchButton
        className="absolute text-gray-400"
        width="16"
        height="16"
        onClick={handleSearchClick}
      />
    </>
  );
}

export default HeaderSearchBar;