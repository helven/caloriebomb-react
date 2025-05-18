// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Project services and utilities

// 4. Components and UI elements
import { useMemo } from 'react';

export function useFilterData({ dataSource, searchQuery, filters }) {
  const filteredAndSortedData = useMemo(() => {
    const filtered = [...dataSource].filter(data => {
      // Check search query
      if (searchQuery && searchQuery !== '') {
        return data.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      // Handle dynamic filters
      for (const [field, value] of Object.entries(filters)) {
        if (value && data[field] !== value) {
          return false;
        }
      }

      return true;
    });

    return filtered;
  }, [dataSource, searchQuery, filters]);

  return filteredAndSortedData;
}

export function useSortData({ dataSource, sortBy, sortOrder }) {
  const sortedData = useMemo(() => {
    // Create a new array before sorting
    const sorted = [...dataSource].sort((a, b) => {
      // Handle non-numeric values
      const aValue = isNaN(a[sortBy]) ? a[sortBy] : Number(a[sortBy]);
      const bValue = isNaN(b[sortBy]) ? b[sortBy] : Number(b[sortBy]);

      // Handle string comparison
      if (typeof aValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle numeric comparison
      return sortOrder === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });

    return sorted;
  }, [dataSource, sortBy, sortOrder]);

  return sortedData;
}

export function usePaginateData({ dataSource, currentPage, itemsPerPage }) {
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return [...dataSource].slice(start, end);
  }, [dataSource, currentPage, itemsPerPage]);

  return paginatedData;
}