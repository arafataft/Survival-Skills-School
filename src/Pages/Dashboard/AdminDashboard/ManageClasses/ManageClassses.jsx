import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const SmallButton = styled(Button)(({ theme }) => ({
  fontSize: '0.55rem',
  padding: theme.spacing(0.5),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const FeedbackButton = styled(Button)(({ theme }) => ({
  fontSize: '0.55rem',
  padding: theme.spacing(0.5),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const FixedSizeImage = styled('img')({
  width: '70px',
  height: '70px',
  borderRadius: '8px',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ManageClasses = () => {
  const { axiosSecure } = useAxiosSecure();
  const [disabledButtons, setDisabledButtons] = useState([]);
  const { data: classes = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await axiosSecure.get('/classes');
      return response.data;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [feedbackValue, setFeedbackValue] = useState('');

  const handleOpenModal = (classId) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClassId('');
    setFeedbackValue('');
  };

  const handleDeny = async (classId) => {
    try {
      setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, classId]);
      await axiosSecure.put(`/manageclasses/${classId}`, { status: 'deny' });
      refetch();
    } catch (error) {
      console.log('Error updating class status:', error);
      setDisabledButtons((prevDisabledButtons) => prevDisabledButtons.filter((id) => id !== classId));
    }
  };

  const handleFeedback = async (classId) => {
    handleOpenModal(classId);
  };

  const handleApprove = async (classId) => {
    try {
      setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, classId]);
      await axiosSecure.put(`/manageclasses/${classId}`, { status: 'approved' });
      refetch();
    } catch (error) {
      console.log('Error updating class status:', error);
      setDisabledButtons((prevDisabledButtons) => prevDisabledButtons.filter((id) => id !== classId));
    }
  };

  const handleFeedbackChange = (event) => {
    setFeedbackValue(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      await axiosSecure.put(`/classes/${selectedClassId}`, { feedback: feedbackValue });
      handleCloseModal();
      refetch();
    } catch (error) {
      console.log('Error updating feedback:', error);
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {isError.message}</span>;
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="manage classes table">
          <TableHead>
            <TableRow>
              <SmallTextCell>Class Image</SmallTextCell>
              <SmallTextCell>Class Name</SmallTextCell>
              <SmallTextCell>Instructor Name</SmallTextCell>
              <SmallTextCell>Instructor Email</SmallTextCell>
              <SmallTextCell>Available Seats</SmallTextCell>
              <SmallTextCell>Price</SmallTextCell>
              <SmallTextCell>Status</SmallTextCell>
              <SmallTextCell>Actions</SmallTextCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem._id}>
                <TableCell>
                  <FixedSizeImage src={classItem.classImage} alt={classItem.className} />
                </TableCell>
                <SmallTextCell>{classItem.className}</SmallTextCell>
                <SmallTextCell>{classItem.instructorName}</SmallTextCell>
                <SmallTextCell>{classItem.instructorEmail}</SmallTextCell>
                <SmallTextCell>{classItem.availableSeats}</SmallTextCell>
                <SmallTextCell>{classItem.price}</SmallTextCell>
                <SmallTextCell>{classItem.status}</SmallTextCell>

                <TableCell>
                  <SmallButton
                    variant="outlined"
                    onClick={() => handleApprove(classItem._id)}
                    disabled={disabledButtons.includes(classItem._id)}
                  >
                    Approve
                  </SmallButton>
                  <SmallButton
                    variant="outlined"
                    onClick={() => handleDeny(classItem._id)}
                    disabled={disabledButtons.includes(classItem._id)}
                  >
                    Deny
                  </SmallButton>
                  <FeedbackButton variant="outlined" onClick={() => handleFeedback(classItem._id)}>
                    Feedback
                  </FeedbackButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Provide Feedback
          </Typography>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={feedbackValue}
            onChange={handleFeedbackChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ManageClasses;
