import React from 'react';
import styles from '../FlightsScheduled.module.css';

const TableHead = () => {
  return (
    <thead>
      <tr className={styles.header}>
        <th id={styles.time}>Time</th>
        <th id={styles.from}>From</th>
        <th id={styles.gate}>Gate</th>
        <th id={styles.destination}>To</th>
        <th id={styles.flight}>Flight</th>
        <th id={styles.status}>Status</th>
      </tr>
    </thead>
  );
};

export default TableHead;
