import React from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div onClick={() => navigate('/')} className={styles.aero}>
          AeroOrbit
        </div>
        <div className={styles.right_container}>
          <div onClick={() => navigate('/')} className={styles.right_item}>
            Home
          </div>
          <div
            onClick={() => navigate('/flights')}
            className={styles.right_item}
          >
            Live Data
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
