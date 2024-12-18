import React, { useState, useEffect } from 'react';

interface YearProps {
  year: number;
  className?: string;
}

export const Year: React.FC<YearProps> = ({ year, className = '' }) => {
  const [yearCount, setYearCount] = useState<number>(year);

  const styles = `years__item ${className}`;

  useEffect(() => {
    if (yearCount !== year) {
      const increment = year > yearCount ? 1 : -1;
      const interval = setInterval(() => {
        setYearCount((prev) => {
          if (prev === year) {
            clearInterval(interval);
            return prev;
          }
          return prev + increment;
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    } else {
      setYearCount(year);
    }
  }, [year, yearCount]);

  return <span className={styles}>{yearCount}</span>;
};
