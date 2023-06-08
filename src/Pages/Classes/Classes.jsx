import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Container } from '@mui/material';
import { AuthContext } from '../../Providers/AuthProvider';


export default function Classes() {
  const [classData, setClassData] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function from React Router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('classes.json');
        if (!response.ok) {
          throw new Error('Failed to fetch class data');
        }
        const data = await response.json();
        setClassData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (classItem) => {
    if (!user) {
      // Redirect to the login route if the user is not logged in
      navigate('/login');
      return;
    }

    if (classItem.availableSeats === 0) {
      alert('No available seats for this class.');
      return;
    }

    // Perform the selection logic here
    // ...
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Classes
        </Typography>

        <Grid container spacing={2}>
          {classData &&
            classData.map((classItem) => (
              <Grid item xs={12} sm={6} md={4} key={classItem._id}>
                <Card sx={{ maxWidth: 345 }} style={classItem.availableSeats === 0 ? { backgroundColor: 'red' } : {}}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={classItem.image}
                    alt={classItem.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body" component="div">
                      {classItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Instructor: {classItem.instructor}
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
    </Container >
  );
}
