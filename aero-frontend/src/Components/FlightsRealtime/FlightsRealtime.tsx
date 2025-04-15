import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './FlightsRealtime.module.css';
import FlightCard from '../FlightCard/FlightCard';
import ScrollPlane from '../ScrollPlane/ScrollPlane';
import { FlightProps } from '../../types';
import { scrollTop } from '../../helpers/scrollTop';
import FlightsGlobe from '../FlightsGlobe/FlightsGlobe';
import { FaAngleDown } from 'react-icons/fa6';
import RateLimiter from '../RateLimiter/RateLimiter';

const FlightsRealtime = () => {
  const [liveFlights, setLiveFlights] = useState<FlightProps[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    const getFlights = async () => {
      try {
        const resp = await fetch('http://localhost:9001/api/realtimeflights', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await resp.json();
        if (resp.ok) {
          setLiveFlights(data.data);
        } else if (resp.status === 429) {
          console.log('Rate limit exceeded');
          setIsRateLimited(true);
        } else {
          console.error('Error from server:', data.message || data);
        }
      } catch (e) {
        console.error(`Error ${e}`);
      }
    };

    getFlights();
  }, []);

  const toTopRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <>
      <span ref={toTopRef}></span>
      <Navbar />
      <ScrollPlane position={{ right: 3, top: 20 }} />
      <div className={styles.bg}></div>
      <div className={`containerDefault ${styles.flightsContainer}`}>
        <div className={styles.flights}>
          {isRateLimited ? (
            <RateLimiter />
          ) : (
            <>
              <FlightsGlobe />
              <div className={styles.headlineContainer}>
                <h1>Explore the Skies: Active Flights Now</h1>
                <div className={styles.iconContainer}>
                  <FaAngleDown
                    onClick={handleScroll}
                    className={styles.icon}
                    fontSize={24}
                  />
                </div>
              </div>
              <div ref={sectionRef} className={styles.flightCards}>
                {liveFlights?.map((flight, index) => {
                  return (
                    <FlightCard
                      key={`${
                        flight.flight.iata ? flight.flight.iata : flight
                      }_${index}} `}
                      flight={flight}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightsRealtime;
