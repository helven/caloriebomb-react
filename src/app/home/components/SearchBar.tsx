// @ts-nocheck : JS compatible
import { useState } from 'react';
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';

function SearchBar() {
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
        onChange={(e)=> handleInputChange(e.target.value)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        placeholder="Search for any food..."
        className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      />
      <SearchButton className="absolute btn-primary text-white" width="24" height="24" onClick={handleSearchClick} />
    </>
  );
}

export default SearchBar;
