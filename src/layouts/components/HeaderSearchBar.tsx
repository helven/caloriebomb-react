// @ts-nocheck : JS compatible
import { useState } from 'react';
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';

function HeaderSearchBar() {
  const { performSearch } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    performSearch(searchQuery);
  };
  
  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }
    performSearch(searchQuery);
  }

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        placeholder="Search for foods..."
        className="pl-3 pr-10 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-64"
      />
      <SearchButton className="absolute text-gray-400" width="16" height="16" onClick={handleSearchClick} />
    </>
  );
}

export default HeaderSearchBar;