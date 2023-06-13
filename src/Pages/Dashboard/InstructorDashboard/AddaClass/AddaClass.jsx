import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

import { AuthContext } from '../../../../Providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AddaClass = () => {
  const { user } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (data) => {
    data.availableSeats = parseInt(data.availableSeats, 10);
    data.instructorName = user?.displayName;
    data.instructorEmail = user?.email;
    data.instructorImage = user?.photoURL||``;
    data.status = 'pending';
    data.enroll = 0;
    console.log(data);
    setIsSubmitting(true);
    try {
      const response = await axiosSecure.post('/classes', data);
      if (response.status === 200) {
        reset();
        console.log('Class added successfully');
      } else {
        console.log('Error adding class');
      }
    } catch (error) {
      console.log('Error:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <Container className="d-flex my-5 justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Box style={{ width: '100%', maxWidth: '500px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add a Class
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <TextField
              id="className"
              label="Class Name"
              variant="outlined"
              fullWidth
              {...register('className', { required: true })}
              error={Boolean(errors.className)}
              helperText={errors.className ? 'This field is required' : ''}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="classImage"
              label="Class Image"
              variant="outlined"
              fullWidth
              {...register('classImage', { required: true })}
              error={Boolean(errors.classImage)}
              helperText={errors.classImage ? 'This field is required' : ''}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="instructorName"
              label={user?.displayName}
              variant="outlined"
              fullWidth
              defaultValue={user?.displayName}
              disabled
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="instructorEmail"
              label={user?.email}
              variant="outlined"
              fullWidth
              defaultValue={user?.email}
              disabled
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="availableSeats"
              label="Available Seats"
              variant="outlined"
              fullWidth
              {...register('availableSeats', { required: true, pattern: /^[0-9]+$/ })}
              error={Boolean(errors.availableSeats)}
              helperText={errors.availableSeats ? 'This field is required and must be a number' : ''}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              fullWidth
              {...register('price', { required: true, pattern: /^[0-9]+$/ })}
              error={Boolean(errors.price)}
              helperText={errors.price ? 'This field is required and must be a number' : ''}
            />
          </Box>

          <Button variant="contained" type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? 'Submitting...' : 'Add Class'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddaClass;
