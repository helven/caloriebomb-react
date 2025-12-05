// Next.js compatible
import { useRef } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

export interface NavigationService {
  navigate: (path: string, params?: Record<string, string>) => void;
  getCurrentPath: () => string;
  getParams: () => Record<string, string>;
  getQueryParams: () => URLSearchParams;
  getQueryString: (param?: string) => string;
  setQueryString: (key: string, value: string) => void;
  removeQueryString: (key: string) => void;
}

// Create a hook that handles all React Router dependencies
const useNavigationService = (): NavigationService => {
  const navigate = useNavigate();
  const location = useLocation();
  let params = useParams();
  const [searchParams] = useSearchParams();
  
  // Use ref to maintain stable reference
  const stableSearchParams = useRef(searchParams);
  
  // Update ref when searchParams changes
  if (stableSearchParams.current !== searchParams) {
    stableSearchParams.current = searchParams;
  }

  const navigateTo = (path: string, params?: Record<string, string>) => {
    if (!params) {
      navigate(path);
      return;
    }

    const urlSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) urlSearchParams.append(key, value);
    });
    const queryString = urlSearchParams.toString();
    navigate(`${path}${queryString ? `?${queryString}` : ''}`);
  }

  const getQueryString = useRef((param?: string) => {
    return param ? (stableSearchParams.current.get(param) ?? '') : '';
  }).current;

  const setQueryString = useRef((key: string, value: string) => {
    const newSearchParams = new URLSearchParams(stableSearchParams.current);
    newSearchParams.set(key, value);
    // Use React Router's batched updates
    requestAnimationFrame(() => {
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    });
  }).current;

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
    navigate: navigateTo,
    getCurrentPath: () => location.pathname,
    getParams: () => sanitizeParams(params),
    getQueryParams: () => searchParams,
    getQueryString,
    setQueryString,
    removeQueryString: removeQueryString,
  };
};

export { useNavigationService };
export default useNavigationService;