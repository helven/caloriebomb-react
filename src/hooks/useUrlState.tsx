import { useState, useEffect } from 'react';
import { useNavigationService } from '@/services/navigation';

export function useUrlState(param: string, defaultValue: string) {
  const navigation = useNavigationService();
  const [value, setValue] = useState(() => 
    navigation.getQueryString(param) || defaultValue
  );

  // Subscribe to URL changes
  useEffect(() => {
    const urlValue = navigation.getQueryString(param);
    setValue(urlValue || defaultValue);
  }, [navigation.getQueryString(param)]);

  // Update URL and state together
  const updateValue = async (newValue: string) => {
    if (newValue) {
      await navigation.setQueryString(param, newValue);
    } else {
      await navigation.removeQueryString(param);
    }
  };

  return [value, updateValue];
}