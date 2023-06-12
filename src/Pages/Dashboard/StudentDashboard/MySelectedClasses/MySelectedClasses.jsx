import { useEffect, useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../Providers/AuthProvider';

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
  borderRadius: '8px',
});

const MySelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const fetchSelectedClasses = async () => {
      try {
        const response = await axiosSecure.get(`/select?userEmail=${user.email}`);
        setSelectedClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    

    if (user) {
      fetchSelectedClasses();
    }
  }, [axiosSecure, user]);

  const handleDeleteClass = async (classId) => {
    try {
      await axiosSecure.delete(`/select/${classId}`);
      setSelectedClasses((prevSelectedClasses) =>
        prevSelectedClasses.filter((classItem) => classItem.id !== classId)
      );
      alert('Class deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete the class.');
    }
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
            <TableRow key={classItem._id}>
              <TableCell>
                <FixedSizeImage src={classItem.classImage} alt={classItem.className} />
              </TableCell>
              <SmallTextCell>{classItem.className}</SmallTextCell>
              <SmallTextCell>{classItem.availableSeat}</SmallTextCell>
              <SmallTextCell>{classItem.price}</SmallTextCell>
              <TableCell>
                <SmallButton variant="outlined" onClick={() => handleDeleteClass(classItem.classId)}>
                  Delete
                </SmallButton>
                <SmallButton variant="outlined" onClick={() => handlePay(classItem.classId)}>
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
