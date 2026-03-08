'use client';

import { useEffect, useState } from 'react';

export const useTypingText = (entryText: string): { textToShow: string; isTypingDone: boolean } => {
  const [textToShow, setTextToShow] = useState('');

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTextToShow(entryText.slice(0, i));
      i++;
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return { textToShow, isTypingDone: entryText === textToShow };
};
