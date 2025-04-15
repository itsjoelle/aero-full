import React from 'react';
import styles from './RateLimiter.module.css';

const RateLimiter = () => {
  return (
    <div className={styles.rateLimiter}>
      <h2>You've exceeded your rate limit!</h2>
      <p>
        You have exceeded the number of requests allowed. Please try again in a
        few minutes!
      </p>
    </div>
  );
};

export default RateLimiter;
