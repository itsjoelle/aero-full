import React, { useEffect, useRef, useState } from 'react';
import styles from './ScrollPlane.module.css';
import { BsAirplaneEngines } from 'react-icons/bs';

type positionObj = {
  right: number;
  top: number;
};

interface ScrollPlaneProps {
  position: positionObj;
}

const ScrollPlane = ({ position }: ScrollPlaneProps) => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollright: 0,
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollPosition({ scrollright: 0, scrollTop: y });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className={styles.scrollplane}
      style={{
        transform: `translate(${scrollPosition.scrollright}px, ${scrollPosition.scrollTop}px) rotate(-180deg)`,
        right: `${position.right}%`,
        top: `${position.top}%`,
      }}
    >
      <BsAirplaneEngines />
    </div>
  );
};

export default ScrollPlane;
