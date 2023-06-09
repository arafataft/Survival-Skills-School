import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const FixedSizeImage = styled('img')({
  width: '70px',
  height: '70px',
  borderRadius:'8px'
});

const MyEnrolledClasses = () => {
  const enrolledClasses = [
    {
      id: 1,
      image: 'https://source.unsplash.com/random/800x600/?class',
      className: 'Class A',
      instructorName: 'John Doe',
      availableSeats: 5,
      price: 100,
    },
    // Add more enrolled classes here
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="my enrolled classes table">
        <TableHead>
          <TableRow>
            <SmallTextCell>Class Image</SmallTextCell>
            <SmallTextCell>Class Name</SmallTextCell>
            <SmallTextCell>Instructor Name</SmallTextCell>
            <SmallTextCell>Available Seats</SmallTextCell>
            <SmallTextCell>Price</SmallTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrolledClasses.map((classItem) => (
            <TableRow key={classItem.id}>
              <TableCell>
                <FixedSizeImage src={classItem.image} alt={classItem.className} />
              </TableCell>
              <SmallTextCell>{classItem.className}</SmallTextCell>
              <SmallTextCell>{classItem.instructorName}</SmallTextCell>
              <SmallTextCell>{classItem.availableSeats}</SmallTextCell>
              <SmallTextCell>{classItem.price}</SmallTextCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyEnrolledClasses;
