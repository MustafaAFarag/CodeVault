import { useState, useCallback } from 'react';

export function useSelectedSubject() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectChange = useCallback((event) => {
    setSelectedSubject(event.target.value); // Handle event target value
  }, []);

  return {
    selectedSubject,
    handleSubjectChange,
  };
}
