import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Search.module.css';
import { IoMdSearch } from 'react-icons/io';

interface SearchProps {
  filter: (searchVal: string) => void;
}

const Search = ({ filter }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  const handleHover = (ev: string) => {
    if (inputRef.current) {
      if (ev === 'leave') {
        if (searchValue !== '') return;
        inputRef.current.blur();
        setSearchValue('');

        setHover(false);
      } else {
        inputRef.current!.focus();
        setHover(true);
      }
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    filter(searchTerm);
    setSearchValue(searchTerm);
  };

  return (
    <div
      onMouseEnter={() => handleHover('enter')}
      onMouseLeave={() => handleHover('leave')}
      className={styles.search}
    >
      <div>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e)}
          className={`${styles.input} ${hover && styles.input_hover}`}
          name="txt"
        />

        <div className={`${styles.icon} ${hover && styles.icon_hover}`}>
          <IoMdSearch fontSize={32} color="#70b0d7" fontWeight={100} />
        </div>
      </div>
    </div>
  );
};

export default Search;
