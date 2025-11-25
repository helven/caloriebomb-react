// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports
import useAppStore from '@/stores/useAppStore';

// 3. Component imports
import { useNavigationService } from '@/services/navigation';

export const useSearch = ({ redirectTo } = {}) => {
  //const { setGlobalSearchQuery } = useAppStore();
  const navigation = useNavigationService();


  const performSearch = (query) => {
    query = query.trim();
    // Set the global search query when the search is performed
    // globalSearchQuery is used by the listing to filter the results
    //setGlobalSearchQuery(query);

    // Handles searches initiated from homepage and redirect to foods page for search result
    if (navigation.getCurrentPath() !== redirectTo) {
      if (query === '') {
        navigation.removeQueryString('search');
        return;
      }
      navigation.navigate(redirectTo, {
        search: query,
      })
      return;
    }

    if (query === '') {
      navigation.removeQueryString('search');
    } else {
      navigation.setQueryString('search', query);
    }
  };

  return {
    performSearch,
  };
};

//export const useSearchHistory = () => {
//  return {};
//}