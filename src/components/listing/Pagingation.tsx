// @ts-nocheck : JS compatible
// 1. React and Next.js core imports
import { useState, useEffect } from 'react';

// 2. Asset imports

// 3. Project services and utilities
import { useNavigationService } from '@/services/navigation';
import { formatNutrient } from '@/utils/formatters';

// 4. Components and UI elements
import { Link } from '@/components/common/Link';
import ArrowProps from '@/components/props/ArrowProps';

function Pagingation({ currentPage, totalPages, onPageChange, onItemsPerPageChange, itemsPerPage, pagingStartIndex, pagingEndIndex, textPerPage }) {
  const navigation = useNavigationService();

  return (
    <section className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">{textPerPage}:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="p-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
        >
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
      <div className="flex items-center">
        <ArrowProps type="left" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
        <div className="flex mx-2">
          {(currentPage > 5) ? (
            <>
              <button
                className={`w-8 h-8 mx-1 rounded-md ${currentPage === 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                onClick={() => onPageChange(1)}
              >
                1
              </button><span className="mx-2">...</span>
            </>
          ) : ('')}

          {(() => {
            const pagesButtons = [];

            for (let i = pagingStartIndex; i <= pagingEndIndex; i++) {
              pagesButtons.push(
                <button
                  key={i + 1}
                  className={`w-8 h-8 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </button>
              )
            }
            return pagesButtons;
          })()}

          {(pagingEndIndex < totalPages - 1) ? (
            <>
              <span className="mx-2">...</span><button
                className={`w-8 h-8 mx-1 rounded-md ${currentPage === totalPages ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          ) : ('')}
        </div>
        <ArrowProps type="right" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
      </div>
      <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">Page {currentPage} of {totalPages}</div>
    </section>
  );
}

export default Pagingation;