import styles from './Airports.module.css';
import Airport, { AirportObj } from './Airport';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import ScrollPlane from '../ScrollPlane/ScrollPlane';
import { scrollTop } from '../../helpers/scrollTop';
import RateLimiter from '../RateLimiter/RateLimiter';

const Airports = () => {
  const [airportData, setAirportData] = useState<AirportObj[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const airports: AirportObj[] = airportData;

  useEffect(() => {
    const getFlights = async () => {
      try {
        const resp = await fetch('http://localhost:9001/api/airports', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await resp.json();
        if (resp.ok) {
          setAirportData(data.data);
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

  const filterSearchAirports = (searchValue: string) => {
    setAirportData(airports);
    if (searchValue === '') {
      setAirportData(airports);
      return;
    }
    const filteredAirports = airports.filter((airport) =>
      airport.airport_name
        .toLocaleLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setAirportData(filteredAirports);
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
      <div className={styles.bgAirports}></div>
      <div className={`containerDefault`}>
        <div className={styles.airportslines}>
          {isRateLimited ? (
            <RateLimiter />
          ) : (
            <div className={styles.outerContainer}>
              <h1>Hubs of the Sky: Explore Airports</h1>
              <Search filter={filterSearchAirports} />
              <div className={styles.airportContainer}>
                {airportData.length === 0 && (
                  <div className={styles.notfound}>Nothing found..</div>
                )}
                {airportData.map((airport) => {
                  return <Airport key={airport.id} airport={airport} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Airports;
