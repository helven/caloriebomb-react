// Typescript file
// Next.js compatible
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

export interface NavigationService {
  navigate: (path: string) => void;
  getCurrentPath: () => string;
  getParams: () => Record<string, string>;
  getQueryParams: () => URLSearchParams;
  getQueryString: (param?: string) => string;
  updateQueryString: (key: string, value: string) => void;
  removeQueryString: (key: string) => void;
}

// Create a hook that handles all React Router dependencies
export const useNavigationService = (): NavigationService => {
  const navigate = useNavigate();
  const location = useLocation();
  let params = useParams();
  const [searchParams] = useSearchParams();

  const updateQueryString = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const removeQueryString = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const sanitizeParams = (params: Record<string, string | null | undefined>): Record<string, string> => {
    if (!params) {
      return {}
    }

    // Convert params to array of entries
    const entries = Object.entries(params);

    // Replace null/undefined values with empty string
    const sanitizedEntries = entries.map(([key, value]) => [
      key,
      value || '' // Convert null/undefined to empty string
    ]);

    // Convert back to object
    return Object.fromEntries(sanitizedEntries);
  };

  params = sanitizeParams(params);

  return {
    navigate: (path: string) => navigate(path),
    getCurrentPath: () => location.pathname,
    getParams: () => sanitizeParams(params),
    getQueryParams: () => searchParams,
    getQueryString: (param?: string) => param ? (searchParams.get(param) ?? '') : '',
    updateQueryString: updateQueryString,
    removeQueryString: removeQueryString,
  };
};