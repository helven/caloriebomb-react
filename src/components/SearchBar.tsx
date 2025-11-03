// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useState, useEffect, useRef } from 'react';

// 2. Asset imports

// 3. Component imports
import { useNavigationService } from '@/services/navigation';
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';

function SearchBar({
  handleUrlSearch = false,
  redirectTo = '',
}) {
  const navigation = useNavigationService();
  const [localSearchValue, setLocalSearchValue] = useState('');
  const { performSearch } = useSearch({
    redirectTo
  });

  useEffect(() => {
    const urlSearch = navigation.getQueryString('search');
    setLocalSearchValue(urlSearch);
  }, [navigation.getQueryString('search')]);
  const timerRef = useRef(null);

  useEffect(() => {
    //if (handleUrlSearch) { // only handle URL search when only allowed one is reacting to the URL search
    //  handleSearchQueryString();
    //}
  }, []);

  // Search Query String handler
  // Sets it to localSearchValue and performs search
  const handleSearchQueryString = () => {
    let value: string | undefined;

    value = navigation.getQueryString('search') ?? ''
    value = value.trim();

    if (!value) {
      return;
    }

    setLocalSearchValue(value);
    performSearch(value);
  };

  // Search input change handler
  const handleInputChange = (value) => {
    value = value.trim();
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

  // Search button click handler
  const handleSearchClick = () => {
    performSearch(localSearchValue);
  };

  // Search input key down handler
  const handleInputKeyDown = (e) => {console.log('aa')
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
