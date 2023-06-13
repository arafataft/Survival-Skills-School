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

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const SmallButton = styled(Button)(({ theme }) => ({
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

const ManageClasses = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: classes = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await axiosSecure.get('/classes');
      return response.data;
    },
  });

  const handleApprove = (classId) => {
    console.log(`Approve class with id ${classId}`);
    refetch();
  };

  const handleDeny = (classId) => {
    console.log(`Deny class with id ${classId}`);
  };

  const handleFeedback = (classId) => {
    console.log(`Send feedback for class with id ${classId}`);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {isError.message}</span>;
  }
  return (
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
                <SmallButton variant="outlined" onClick={() => handleApprove(classItem._id)}>
                  Approve
                </SmallButton>
                <SmallButton variant="outlined" onClick={() => handleDeny(classItem._id)}>
                  Deny
                </SmallButton>
                <SmallButton variant="outlined" onClick={() => handleFeedback(classItem._id)}>
                  Send Feedback
                </SmallButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageClasses;
