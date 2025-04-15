import TableRow from './TableRow';
import { TableProps } from './Table';

const TableBody = ({ flights }: TableProps) => {
  return (
    <tbody>
      {flights.map((flight, index) => {
        return <TableRow key={index} flight={flight} />;
      })}
    </tbody>
  );
};

export default TableBody;
