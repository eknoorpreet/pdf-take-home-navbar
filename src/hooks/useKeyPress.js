import { useEffect } from 'react';

export default function useKeyPress(targetKey, callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === targetKey) {
        callback();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [targetKey, callback]);
}
