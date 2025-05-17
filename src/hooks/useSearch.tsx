// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports
import useAppStore from '@/stores/useAppStore';

// 3. Component imports
import { useNavigationService } from '@/services/navigation';

export const useSearch = ({ redirectTo } = {}) => {
  const { setGlobalSearchQuery } = useAppStore();
  const navigation = useNavigationService();
  

  const performSearch = (query) => {
    query = query.trim();
    setGlobalSearchQuery(query); // only set the global search query when the search is performed

    // If user is not on the foods page, redirect them there with the search query
    // This handles searches initiated from home page or other pages
    if (navigation.getCurrentPath() !== redirectTo) {
      if (query === '') {
        return;
      }
      navigation.navigateWithQuery(redirectTo, {
        search: query,
      })
      // Perform search logic here
    } else {
      if (query === '') {
        navigation.removeQueryString('search');
      } else {
        navigation.updateQueryString('search', query);
      }
    }
  };

  return {
    performSearch,
  };
};

//export const useSearchHistory = () => {
//  return {};
//}