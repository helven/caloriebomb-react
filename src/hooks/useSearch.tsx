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
     // Set the global search query when the search is performed
     // globalSearchQuery is used by the listing to filter the results
    setGlobalSearchQuery(query);

    // Enable redirection to actual results page
    // Eg This handles searches initiated from homepage and redirect to foods page for search result
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