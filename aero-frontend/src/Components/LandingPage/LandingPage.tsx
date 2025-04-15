import React, { useEffect, useRef } from 'react';
import styles from './LandingPage.module.css';
import { FaAngleDown } from 'react-icons/fa6';
import Navbar from '../Navbar/Navbar';
import CardsSection from '../CardsSection/CardsSection';
import plane from '../../assets/plane.svg';
import { scrollTop } from '../../helpers/scrollTop';

const LandingPage = () => {
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const toTopRef = useRef<HTMLSpanElement>(null);

  const handleScroll = () => {
    cardSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

    topSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <span ref={toTopRef}></span>
      <Navbar />
      <div className={styles.bg}></div>
      <div className={styles.wrapper}>
        <div className={styles.headlineContainer}>
          <h1 className={styles.headline}>Welcome to AeroOrbit</h1>
          <h2>Are you ready to discover the world of aviation?</h2>
          <button onClick={handleScroll}>
            <span>EXPLORE</span>
            <span className={styles.icon}>
              <FaAngleDown fontSize={21} />
            </span>
          </button>
        </div>
        <img className={styles.plane} src={plane} alt="plane" />
      </div>

      <div ref={cardSectionRef} className={styles.cardsSectionWrapper}>
        <CardsSection />
      </div>
    </div>
  );
};

export default LandingPage;
