import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAxiosSecure from 'path/to/useAxiosSecure';

export default function PopularClasses() {
  const [classData, setClassData] = useState(null);
  const { axiosSecure } = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get('classes');
        setClassData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const sortedClassData = classData?.filter((classItem) => classItem.availableSeats > 0).sort((b, a) => a.enroll - b.enroll);

  const displayedClassData = sortedClassData?.slice(0, 6);

  return (
    <Box my={7}>
        <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Popular Classes
        </Typography>

        <Grid container spacing={2}>
          {displayedClassData &&
            displayedClassData.map((classItem) => (
              <Grid item xs={12} sm={6} md={4} key={classItem._id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="140" image={classItem.classImage} alt={classItem.className} />
                  <CardContent>
                    <Typography gutterBottom variant="body" component="div">
                      {classItem.className}
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
    </Container>
    </Box>
  );
}
