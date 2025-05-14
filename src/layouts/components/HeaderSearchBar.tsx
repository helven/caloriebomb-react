// @ts-nocheck : JS compatible
import SearchButton from '@/components/SearchButton';
import {useSearch} from '@/hooks/useSearch';

function HeaderSearchBar() {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for foods..."
        className="pl-3 pr-10 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-64"
      />
      <SearchButton className="absolute text-gray-400" width="16" height="16" />
    </>
  );
}

export default HeaderSearchBar;