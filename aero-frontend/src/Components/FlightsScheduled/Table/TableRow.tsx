import { FlightProps } from '../../../types';
import TableCell from './TableCell';

interface TableRowProps {
  flight: FlightProps;
}

const TableRow = ({ flight }: TableRowProps) => {
  const obj = {
    time: flight.departure.scheduled.split('T')[1].slice(0, 5),
    from: flight.departure.iata,
    gate: flight.departure.gate ? flight.departure.gate : 'N/A',
    to: flight.arrival.iata,
    flight: flight.flight.number,
    status: flight.flight_status,
  };

  const words = Object.values(obj);

  return (
    <tr>
      {words && words?.map((word, i) => <TableCell key={i} word={word} />)}
    </tr>
  );
};

export default TableRow;
