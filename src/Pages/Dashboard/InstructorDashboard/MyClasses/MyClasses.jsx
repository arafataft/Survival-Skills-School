import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedClassName, setUpdatedClassName] = useState('');
  const [updatedAvailableSeats, setUpdatedAvailableSeats] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const { axiosSecure } = useAxiosSecure();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get('/instructor-classes');
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, [axiosSecure]);

  const handleUpdate = (classItem) => {
    setSelectedClass(classItem);
    setOpenModal(true);
    setUpdatedClassName(classItem.className);
    setUpdatedAvailableSeats(classItem.availableSeats);
    setUpdatedPrice(classItem.price);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axiosSecure.put(`/classes/${selectedClass._id}`, {
        className: updatedClassName,
        availableSeats: updatedAvailableSeats,
        price: updatedPrice,
      });
      if (response.data) {
        const updatedClasses = classes.map((classItem) => {
          if (classItem._id === selectedClass._id) {
            return {
              ...classItem,
              className: updatedClassName,
              availableSeats: updatedAvailableSeats,
              price: updatedPrice,
            };
          }
          return classItem;
        });
        setClasses(updatedClasses);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="my classes table">
          <TableHead>
            <TableRow>
              <SmallTextCell>Class Name</SmallTextCell>
              <SmallTextCell>Price</SmallTextCell>
              <SmallTextCell>Status</SmallTextCell>
              <SmallTextCell>Total Enrolled Students</SmallTextCell>
              <SmallTextCell>Feedback</SmallTextCell>
              <SmallTextCell>Actions</SmallTextCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem._id}>
                <SmallTextCell>{classItem.className}</SmallTextCell>
                <SmallTextCell>{classItem.price}</SmallTextCell>
                <SmallTextCell>{classItem.status}</SmallTextCell>
                <SmallTextCell>{classItem.enroll}</SmallTextCell>
                <SmallTextCell>{classItem.feedback}</SmallTextCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleUpdate(classItem)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            value={updatedClassName}
            onChange={(e) => setUpdatedClassName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Available Seats"
            type="number"
            value={updatedAvailableSeats}
            onChange={(e) => setUpdatedAvailableSeats(Number(e.target.value))}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(Number(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyClasses;