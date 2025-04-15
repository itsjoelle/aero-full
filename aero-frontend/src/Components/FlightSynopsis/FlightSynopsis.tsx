import React, { useEffect, useRef, useState } from 'react';
import styles from './FlightSynopsis.module.css';
import Navbar from '../Navbar/Navbar';
import Map from '../Map/Map';
import { scrollTop } from '../../helpers/scrollTop';

export interface Coordinate {
  planeLatitude: number;
  planeLongitude: number;
  departureCity: string;
  destinationCity: string;
  departureLatitude: number;
  departureLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  direction: number;
}

interface SynopsisData {
  flight: string;
  status: string;
  city_depart: string;
  terminal_depart: string;
  terminal_gate_depart: string;
  city_arrival: string;
  terminal_arrival: string;
  terminal_gate_arrival: string;
  latitude: number;
  longitude: number;
  horizontal_speed: number;
  vertical_speed: number;
  airline_name: string;
  updated: string;
  coordinates: Coordinate;
}
const FlightSynopsis = () => {
  const [synopsisData, setSynopsisData] = useState<SynopsisData | null>(null);

  useEffect(() => {
    const getSynopsisData = async () => {
      try {
        const resp = await fetch('http://localhost:9001/api/synopsisData', {
          method: 'GET',
          credentials: 'include',
        });

        if (resp.ok) {
          const data = await resp.json();
          setSynopsisData(data.data);
        } else {
          const errorData = await resp.json();
          console.error('Error from server:', errorData.message || errorData);
        }
      } catch (e) {
        console.error(`Error ${e}`);
      }
    };

    getSynopsisData();
  }, []);

  const toTopRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <>
      <span ref={toTopRef}></span>
      <Navbar />
      <div className={styles.bg}></div>

      <div className={`containerDefault ${styles.synopsis}`}>
        <div className={styles.outerContainer}>
          <div className={styles.headerContainer}>
            <h1>{synopsisData?.flight}</h1>
            <div>currently {synopsisData?.status}</div>
          </div>

          <div className={styles.flightInfoContainer}>
            <div className={styles.flightInfo}>
              <div className={styles.cityname}>{synopsisData?.city_depart}</div>
              <div className={styles.terminalgate}>
                Departed from {synopsisData?.terminal_depart}
                <span className={styles.terminalGateInfo}>
                  {synopsisData?.terminal_gate_depart}
                </span>
              </div>
            </div>

            <div className={styles.flightInfo}>
              <div className={styles.cityname}>
                {synopsisData?.city_arrival}
              </div>
              <div className={styles.terminalgate}>
                Arrival at {synopsisData?.terminal_arrival}
                <span className={styles.terminalGateInfo}>
                  {synopsisData?.terminal_gate_arrival}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.horizontalDivider}></div>

          <div className={styles.belowContainer}>
            <div className={styles.belowInfo}>
              <div className={styles.coordinates}>
                <div>{synopsisData?.latitude}</div>
                <div>{synopsisData?.longitude}</div>
                <div>{synopsisData?.horizontal_speed}</div>
                <div>{synopsisData?.vertical_speed}</div>
              </div>

              <div className={styles.additional}>
                <div className={styles.airline}>
                  {synopsisData?.airline_name}
                </div>
                <div className={styles.updated}>{synopsisData?.updated}</div>
              </div>
            </div>
            <Map mapData={synopsisData!.coordinates} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSynopsis;
