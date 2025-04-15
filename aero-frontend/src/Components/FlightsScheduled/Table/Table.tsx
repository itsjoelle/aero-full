import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { FlightProps } from '../../../types';

export interface TableProps {
  flights: FlightProps[];
}
const Table = ({ flights }: TableProps) => {
  return (
    <table>
      <TableHead />
      <TableBody flights={flights} />
    </table>
  );
};

export default Table;
