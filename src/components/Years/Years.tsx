import React from 'react';
import { Year } from './Year/Year';

interface YearsProps {
  years: number[];
}

export const Years: React.FC<YearsProps> = ({ years }) => {
  return (
    <div className="years">
      <Year year={years[0]} className="years__start" />
      <Year year={years[1]} className="years__end" />
    </div>
  );
};
