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

const MyClasses = () => {
  const classes = [
    {
      id: 1,
      className: 'Class A',
      status: 'Pending',
      enrolledStudents: 0,
      feedback: '',
    },
    // Add more class objects here
  ];

  const handleUpdate = (classId) => {
    console.log(`Update class with id ${classId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="my classes table">
        <TableHead>
          <TableRow>
            <SmallTextCell>Class Name</SmallTextCell>
            <SmallTextCell>Status</SmallTextCell>
            <SmallTextCell>Total Enrolled Students</SmallTextCell>
            <SmallTextCell>Feedback</SmallTextCell>
            <SmallTextCell>Actions</SmallTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((classItem) => (
            <TableRow key={classItem.id}>
              <SmallTextCell>{classItem.className}</SmallTextCell>
              <SmallTextCell>{classItem.status}</SmallTextCell>
              <SmallTextCell>{classItem.enrolledStudents}</SmallTextCell>
              <SmallTextCell>{classItem.feedback}</SmallTextCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleUpdate(classItem.id)}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyClasses;
