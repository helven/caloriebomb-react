import { useNavigate, useLocation } from 'react-router-dom';
import useAppStore from '@/stores/useAppStore';

export const useSearch = () => {
  const { setSearchQuery } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const performSearch = (query: string) => {
    if (query.trim() === '') {
      return;
    }

    setSearchQuery(query);

    if (location.pathname !== '/foods') {
      navigate('/foods');
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