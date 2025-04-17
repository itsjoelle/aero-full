import React, { memo } from 'react';
import styles from './Airports.module.css';
import { GoArrowUpRight } from 'react-icons/go';
import { AirlineObj } from '../../types';

export interface AirlineProps {
  airline: AirlineObj;
}

const Airline = ({ airline: al }: AirlineProps) => {
  return (
    <div className={styles.airport_airline}>
      <div className={styles.name}>{al.airline_name}</div>
      <div className={styles.horizontalDivider}></div>
      <div>Fleet size of {al.fleet_size} aircraft</div>
      <div>Average fleet age of {al.fleet_average_age} years</div>
      <div className={styles.bottom}>
        <div>Located in {al.country_name.split(' ').slice(0, 2).join(' ')}</div>
        <div>Founded in {al.date_founded}</div>
      </div>
      <a target="_blank" href={al.link}>
        Visit <GoArrowUpRight fontSize={16} />
      </a>
    </div>
  );
};

export default memo(Airline);
