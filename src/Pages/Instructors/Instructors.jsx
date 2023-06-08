import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';

export default function Instructors() {
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('instructor.json'); 
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

  return (
    <Container>
        <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Instructors
      </Typography>

      <Grid container spacing={2}>
        {classData &&
          classData.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={classItem.image}
                  alt={classItem.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {classItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {classItem.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      </Box>
    </Container>
  );
}
