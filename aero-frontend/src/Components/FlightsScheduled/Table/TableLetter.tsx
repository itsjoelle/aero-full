import { useState } from 'react';
import styles from '../FlightsScheduled.module.css';

interface TableLetterProps {
  letter: string;
  index: number;
}
const TableLetter = ({ letter, index }: TableLetterProps) => {
  const [flip, setFlip] = useState(false);

  setTimeout(() => {
    setFlip(true);
  }, 100 * index);

  return (
    <div className={`${flip ? styles.flip : null}`}>{flip ? letter : null}</div>
  );
};

export default TableLetter;
