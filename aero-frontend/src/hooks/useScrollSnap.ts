import { useEffect, useState } from 'react';

export const useScrollSnap = () => {
  const [scrollSection, setScrollSection] = useState('top');
  useEffect(() => {
    const scrollHandler = () => {
      console.log(window.scrollY);

      if (window.scrollY > 0 && window.scrollY < 880) setScrollSection('cards');
      else setScrollSection('top');
    };
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return scrollSection;
};
