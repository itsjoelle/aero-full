import React from 'react';
import styles from './CardsSection.module.css';
import { useNavigate } from 'react-router-dom';
import planeview from '../../assets/planeview.svg';
import { cardData } from '../../data/staticData';

const CardsSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          <img className={styles.planeview} src={planeview} alt="planview" />

          {cardData.map((card, i) => {
            return (
              <div
                key={i}
                onClick={() => navigate(`/${card.navigate}`)}
                className={styles.item}
              >
                <div>
                  <img
                    className={styles.aircraft}
                    src={card.image}
                    alt="aircraft"
                  />

                  <div className={styles.textContainer}>
                    <h3 className={styles.title}>{card.title}</h3>
                    <p className={styles.description}>{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CardsSection;
