import {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Container } from '@mui/material';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function Classes() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { axiosSecure } = useAxiosSecure();

  const { data: classData = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['approveclasses'],
    queryFn: async () => {
      const response = await axiosSecure.get('/approveclasses');
      return response.data;
    },
  });

  const handleSelect = async (classItem) => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    if (classItem.availableSeats === 0) {
      alert('No available seats for this class.');
      return;
    }
  
    const selectData = {
      classId: classItem._id,
      className: classItem.className,
      classImage: classItem.classImage,
      availableSeat: classItem.availableSeats,
      userEmail: user?.email,
      price: classItem.price,
      instructorName: classItem.instructorName,
      instructorEmail: classItem.instructorEmail,
      instructorImage: classItem.instructorImage
    };
  
    try {
      await axiosSecure.post('/select', selectData);
      alert('Class selected successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to Add. ' + error.response.data.message); // Display the error message returned by the backend
    }
    refetch();
  };
  

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {isError.message}</span>;
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Classes
        </Typography>

        <Grid container spacing={2}>
          {classData.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem._id}>
              <Card sx={{ maxWidth: 345 }} style={classItem.availableSeats === 0 ? { backgroundColor: 'red' } : {}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={classItem.classImage}
                  alt={classItem.className}
                />
                <CardContent>
                  <Typography gutterBottom variant="body" component="div">
                    {classItem.className}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor: {classItem.instructorName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Seat: {classItem.availableSeats}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {classItem.price}
                  </Typography>
                  <Button
                    variant='outlined'
                    onClick={() => handleSelect(classItem)}
                    disabled={classItem.availableSeats === 0}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
