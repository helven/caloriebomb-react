// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports
import useAppStore from '@/stores/useAppStore';

// 3. Component imports
import { useNavigationService } from '@/services/navigation';

export const useSearch = () => {
  const { setGlobalSearchQuery } = useAppStore();
  const navigation = useNavigationService();
  

  const performSearch = (query) => {
    setGlobalSearchQuery(query);
    query = query.trim();
    

    if (navigation.getCurrentPath() !== '/foods') {
      if (query === '') {
        return;
      }
      navigation.navigateWithQuery('/foods', {
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