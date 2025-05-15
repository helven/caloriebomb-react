import useAppStore from '@/stores/useAppStore';
import { useNavigationService } from '@/services/navigation';

export const useSearch = () => {
  const { setSearchQuery } = useAppStore();
  const navigation = useNavigationService();
  

  const performSearch = (query: string) => {
    if (query.trim() === '') {
      return;
    }

    setSearchQuery(query);

    if (location.pathname !== '/foods') {
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