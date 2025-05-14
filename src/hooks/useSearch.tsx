import { useNavigate, useLocation } from 'react-router-dom';
import useAppStore from '@/stores/useAppStore';

export const useSearch = () => {
  const { searchQuery, setSearchQuery } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (location.pathname !== '/foods') {
      navigate('/foods');
    }
  };

  return {
    searchQuery,
    handleSearch,
  };
};

//export const useSearchHistory = () => {
//  return {};
//}