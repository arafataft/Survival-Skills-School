import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../../Providers/AuthProvider';

const AddaClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (data) => {
    data.instructorName = user.displayName;
    data.instructorEmail = user.email;
    data.status = 'pending';
    setIsSubmitting(true);
    try {
      const response = await fetch('https://example-api.com/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
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
              error={errors.className}
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
              error={errors.classImage}
              helperText={errors.classImage ? 'This field is required' : ''}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="instructorName"
              label="Instructor Name"
              variant="outlined"
              fullWidth
              defaultValue={user?.displayName}
              disabled
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="instructorEmail"
              label="Instructor Email"
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
              {...register('availableSeats', { required: true })}
              error={errors.availableSeats}
              helperText={errors.availableSeats ? 'This field is required' : ''}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              fullWidth
              {...register('price', { required: true })}
              error={errors.price}
              helperText={errors.price ? 'This field is required' : ''}
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