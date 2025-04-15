import React, { useEffect, useRef, useState } from 'react';
import styles from './FlightsScheduled.module.css';
import Table from './Table/Table';
import ScrollPlane from '../ScrollPlane/ScrollPlane';
import Navbar from '../Navbar/Navbar';
import { scrollTop } from '../../helpers/scrollTop';
import RateLimiter from '../RateLimiter/RateLimiter';

const FlightsScheduled = () => {
  const toTopRef = useRef<HTMLSpanElement>(null);
  const [scheduledFlights, setScheduledFlights] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const getFlights = async () => {
      try {
        const resp = await fetch('http://localhost:9001/scheduledflights', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await resp.json();
        if (resp.ok) {
          setScheduledFlights(data.data);
        } else if (resp.status === 429) {
          console.log('Rate limit exceeded');
          setIsRateLimited(true);
        } else {
          console.error('Error from server:', data.message || data);
        }
      } catch (e) {
        console.log(`Error ${e}`);
      }
    };

    getFlights();
  }, []);

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <>
      <span ref={toTopRef}></span>
      <Navbar />
      <ScrollPlane position={{ right: 3, top: 20 }} />
      <div className={styles.bg}></div>
      <div className={`containerDefault`}>
        <div>
          {isRateLimited ? (
            <RateLimiter />
          ) : (
            <div className={styles.scheduled}>
              <h1>Upcoming Flight Schedules</h1>
              <Table flights={scheduledFlights} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightsScheduled;
