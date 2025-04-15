import styles from './Airports.module.css';
import Airline, { AirlineObj } from './Airline';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import ScrollPlane from '../ScrollPlane/ScrollPlane';
import { scrollTop } from '../../helpers/scrollTop';
import RateLimiter from '../RateLimiter/RateLimiter';

const Airlines = () => {
  const [airlineData, setAirlineData] = useState<AirlineObj[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const airlines: AirlineObj[] = airlineData;

  useEffect(() => {
    const getFlights = async () => {
      try {
        const resp = await fetch('http://localhost:9001/api/airlines', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await resp.json();
        if (resp.ok) {
          setAirlineData(data.data);
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

  const filterSearchAirlines = (searchValue: string) => {
    if (searchValue === '') {
      setAirlineData(airlines);
      return;
    }
    const filteredAirlines = airlines.filter((airline) =>
      airline.airline_name
        .toLocaleLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setAirlineData(filteredAirlines);
  };

  const toTopRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <>
      <span ref={toTopRef}></span>
      <Navbar />
      <ScrollPlane position={{ right: 3, top: 20 }} />
      <div className={styles.bgAirlines}></div>
      <div className={`containerDefault`}>
        <div className={styles.airportslines}>
          {isRateLimited ? (
            <RateLimiter />
          ) : (
            <div className={styles.outerContainer}>
              <h1>Global Airlines: Your Travel Partners</h1>
              <Search filter={filterSearchAirlines} />
              <div className={styles.airportContainer}>
                {airlineData.length === 0 && (
                  <div className={styles.notfound}>Nothing found..</div>
                )}
                {airlineData.map((airline) => {
                  return <Airline key={airline.id} airline={airline} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Airlines;
