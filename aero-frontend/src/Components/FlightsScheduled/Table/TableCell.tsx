import TableLetter from './TableLetter';

type WordProps = {
  word: string;
};
const TableCell = ({ word }: WordProps) => {
  return (
    <td>
      {word &&
        Array.from(word).map((letter, index) => (
          <TableLetter key={index} letter={letter} index={index} />
        ))}
    </td>
  );
};

export default TableCell;
