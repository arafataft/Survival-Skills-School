import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const FixedSizeImage = styled('img')({
  width: '70px',
  height: '70px',
  borderRadius: '8px',
});

const MyEnrolledClasses = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: enrolledClasses = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['enrolled-Classes'],
    queryFn: async () => {
      const response = await axiosSecure.get('/enrolled-classes');
      return response.data;
    },
  });

  useEffect(() => {
    refetch(); 
  }, [axiosSecure, refetch]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {isError.message}</span>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="my enrolled classes table">
        <TableHead>
          <TableRow>
            <SmallTextCell>Class Image</SmallTextCell>
            <SmallTextCell>Class Name</SmallTextCell>
            <SmallTextCell>Instructor Name</SmallTextCell>
            <SmallTextCell>Price</SmallTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrolledClasses.map((classItem) => (
            <TableRow key={classItem._id}>
              <TableCell>
                <FixedSizeImage src={classItem.classImage} alt={classItem.className} />
              </TableCell>
              <SmallTextCell>{classItem.className}</SmallTextCell>
              <SmallTextCell>{classItem.instructorName}</SmallTextCell>
              <SmallTextCell>{classItem.price}</SmallTextCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyEnrolledClasses;
