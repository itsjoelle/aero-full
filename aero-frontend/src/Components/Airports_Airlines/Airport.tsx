import React, { memo } from 'react';
import styles from './Airports.module.css';
import { GoArrowUpRight } from 'react-icons/go';
import { AirportObj } from '../../types';

interface AirportProps {
  airport: AirportObj;
}

const Airport = ({ airport: ap }: AirportProps) => {
  return (
    <div className={styles.airport_airline}>
      <div className={styles.name}>{ap.airport_name}</div>
      <div className={styles.horizontalDivider}></div>
      <div>Located in {ap.country_name}</div>
      <div>{ap.timezone} Timezone</div>
      <div className={styles.coordinates}>
        <div>Coordinates</div>
        <div className={styles.lat}>
          <div>Latitude {ap.latitude}</div>
          <div>Longitude {ap.longitude} </div>
        </div>
      </div>
      <a target="_blank" href={ap.link}>
        Visit <GoArrowUpRight fontSize={16} />
      </a>
    </div>
  );
};

export default memo(Airport);
