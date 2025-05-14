// @ts-nocheck : JS compatible
import SearchButton from '@/components/SearchButton';
import { useSearch } from '@/hooks/useSearch';

function SearchBar() {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for any food..."
        className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      />
      <SearchButton className="absolute btn-primary text-white" width="24" height="24" />
    </>
  );
}

export default SearchBar;
