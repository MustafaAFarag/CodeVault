import { useState } from 'react';

export function useSelectedSubject() {
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return {
    selectedSubject,
    handleSubjectChange,
  };
}
