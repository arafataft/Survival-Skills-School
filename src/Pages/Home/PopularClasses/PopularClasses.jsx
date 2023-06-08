import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PopularClasses() {
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    // Fetch class data here and set it using setClassData
    // Example: Fetch data from an API endpoint or import it from a separate file
    const fetchData = async () => {
      try {
        const response = await fetch('classes.json'); // Replace with the actual file path in the public folder
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

  // Filter and sort the class data based on available seats
  const sortedClassData = classData?.filter((classItem) => classItem.availableSeats > 0).sort((a, b) => a.availableSeats - b.availableSeats);

  // Display only the first 6 cards with the lowest available seats
  const displayedClassData = sortedClassData?.slice(0, 6);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Popular Classes
      </Typography>

      <Grid container spacing={2}>
        {displayedClassData &&
          displayedClassData.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem._id}>
              <Card sx={{ maxWidth: 345 }}>
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
                    Available Seats: {classItem.availableSeats}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
