// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports
import { useEffect, useRef, useState } from 'react';

// 2. Asset imports

// 3. Component imports
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';
import { useNavigationService } from '@/services/navigation';

type Props = {
  redirectTo?: string
}

function HeaderSearchBar({ redirectTo = '' }: Props) {
  const navigation = useNavigationService();
  const [localSearchValue, setLocalSearchValue] = useState('');
  const { performSearch } = useSearch({
    redirectTo,
  });

  useEffect(() => {
    const urlSearch = navigation.getQueryString('search');
    setLocalSearchValue(urlSearch);
  }, [navigation.getQueryString('search')]);

  const timerRef = useRef(null);

  // Search input change handler
  const handleInputChange = (value) => {
    setLocalSearchValue(value);

    if (value.trim() === '') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        performSearch('');
        timerRef.current = null;
      }, 100);
    }
  };

  // Search button click handler
  const handleSearchClick = () => {
    performSearch(localSearchValue);
  };

  // Search input key down handler
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch(localSearchValue);
    }
  };

  return (
    <>
      <input
        type="text"
        value={localSearchValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        placeholder="Search for foods..."
        className="w-64 rounded-full border border-gray-300 py-1 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <SearchButton className="absolute text-gray-400" width="16" height="16" onClick={handleSearchClick} />
    </>
  );
}

export default HeaderSearchBar;
