import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function Instructors() {
  const [classData, setClassData] = useState(null);
  const { axiosSecure } = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get('/classes');
        setClassData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <Box my={8}>
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
                      image={classItem.instructorImage}
                      alt={classItem.instructorName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {classItem.instructorName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {classItem.instructorEmail}
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
