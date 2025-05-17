// @ts-nocheck : JS compatible
// 1. React and Next.js core imports
import { RefObject, useEffect } from 'react';

// 2. Third-party library imports

// 3. Project services and utilities

// 4. Components and UI elements

function useOnClickOutside(ref, onClose) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup phase: remove the event listener when the component unmounts
    return () => {
      if (ref.current) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [ref, onClose]);
}

export default useOnClickOutside;