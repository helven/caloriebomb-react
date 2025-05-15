// @ts-nocheck : JS compatible
import useAppStore from '@/stores/useAppStore';
import { useNavigationService } from '@/services/navigation';

export const useSearch = () => {
  const { setSearchQuery } = useAppStore();
  const navigation = useNavigationService();
  

  const performSearch = (query) => {
    setSearchQuery(query);

    if (location.pathname !== '/foods') {
      if (query.trim() === '') {
        return;
      }
      navigation.navigate('/foods');
      // Perform search logic here
    }
  };

  return {
    performSearch,
  };
};

//export const useSearchHistory = () => {
//  return {};
//}