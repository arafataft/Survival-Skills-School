import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const SmallButton = styled(Button)(({ theme }) => ({
  fontSize: '0.55rem',
  padding: theme.spacing(0.5),
  marginRight: theme.spacing(1),
}));

const FixedSizeImage = styled('img')({
  width: '70px',
  height: '70px',
});

const MySelectedClasses = () => {
  const [selectedClasses, setSelectedClasses] = useState([
    {
      id: 1,
      image: 'https://source.unsplash.com/random/800x600/?class',
      className: 'Class A',
      availableSeats: 5,
      price: 100,
    },
    // Add more selected classes here
  ]);

  const handleDeleteClass = (classId) => {
    setSelectedClasses((prevSelectedClasses) =>
      prevSelectedClasses.filter((classItem) => classItem.id !== classId)
    );
  };

  const handlePay = (classId) => {
    console.log(`Pay for class with id ${classId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="my selected classes table">
        <TableHead>
          <TableRow>
            <SmallTextCell>Class Image</SmallTextCell>
            <SmallTextCell>Class Name</SmallTextCell>
            <SmallTextCell>Available Seats</SmallTextCell>
            <SmallTextCell>Price</SmallTextCell>
            <SmallTextCell>Actions</SmallTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedClasses.map((classItem) => (
            <TableRow key={classItem.id}>
              <TableCell>
                <FixedSizeImage src={classItem.image} alt={classItem.className} />
              </TableCell>
              <SmallTextCell>{classItem.className}</SmallTextCell>
              <SmallTextCell>{classItem.availableSeats}</SmallTextCell>
              <SmallTextCell>{classItem.price}</SmallTextCell>
              <TableCell>
                <SmallButton variant="outlined" onClick={() => handleDeleteClass(classItem.id)}>
                  Delete
                </SmallButton>
                <SmallButton variant="outlined" onClick={() => handlePay(classItem.id)}>
                  Pay
                </SmallButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MySelectedClasses;
