import React from 'react';
import styles from './FlightCard.module.css';
import { BsAirplane } from 'react-icons/bs';
import { GoArrowRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { FlightProps } from '../../types';

interface FlightCardProps {
  flight: FlightProps;
}
const FlightCard = ({ flight }: FlightCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.flightContainer}>
      <div className={styles.flight}>
        <div className={styles.nameContainer}>
          <div className={styles.shortname}>{flight.departure.iata}</div>
          <div className={styles.name}>{flight.departure.airport}</div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <BsAirplane fontSize={34} />
          </div>
          <div>{flight.flight.number}</div>
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.shortname}>{flight.arrival.iata}</div>

          <div className={styles.name}>
            {flight.arrival.airport && flight.arrival.airport.split(' ')[0]}
          </div>
        </div>
      </div>
      <div className={styles.additionalContainer}>
        <div className={styles.additional}>
          <div>{flight.flight_date}</div>
          <div>Status: {flight.flight_status}</div>
          <div>
            Delay:{' '}
            {!flight.arrival.delay ? 'none' : flight.arrival.delay + ' mins'}
          </div>
        </div>
        <div>Provided by {flight.airline.name}</div>
      </div>
      <div onClick={() => navigate('/synopsis')} className={styles.moreinfo}>
        More Information <GoArrowRight fontSize={19} />
      </div>
    </div>
  );
};

export default FlightCard;
