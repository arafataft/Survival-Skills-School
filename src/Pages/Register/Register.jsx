import { useContext, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { app } from '../../firebase/firebase.config';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const { axiosSecure } = useAxiosSecure();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleRegister = async (data) => {
    const { name, photo, email, password, confirmPassword } = data;

    // Password validation checks
    const hasMinimumLength = password.length >= 6;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

    if (!hasMinimumLength) {
      setError('Password should be at least 6 characters long');
      return;
    }

    if (!hasCapitalLetter) {
      setError('Password should contain at least one capital letter');
      return;
    }

    if (!hasSpecialCharacter) {
      setError('Password should contain at least one special character');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUser(email, password, name, photo);
      await axiosSecure.post('/users', { name, email, photo }); // Replace with the appropriate endpoint for user registration
      alert('Registration successful! Please Login');
      setError('');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }

    reset();
  };

  const password = watch('password');

  const handleGoogleLogin = () => {
    // Handle Google Sign-In

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const saveUser = { name: displayName, email };

        axios
          .post('http://localhost:5000/users', saveUser)
          .then(() => {
            alert('Registration successful! Please Login');
            setError('');
            navigate('/login');
          })
          .catch((error) => {
            setError(error.response.data);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="md" sx={{ my: 'auto', mb: 3, mt: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" component="h1" align="center" gutterBottom>
                Register
              </Typography>
              <Box component="form" onSubmit={handleSubmit(handleRegister)}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  {...register('name', { required: true })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  {...register('email', { required: true })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <FormControl error sx={{ mt: 0.5 }}>
                    <FormHelperText>
                      {errors.password.type === 'required'
                        ? 'Password is required'
                        : 'Invalid password'}
                    </FormHelperText>
                  </FormControl>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <FormControl error sx={{ mt: 0.5 }}>
                    <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
                  </FormControl>
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="photo"
                  label="Photo URL"
                  name="photo"
                  {...register('photo')}
                />
                {error && (
                  <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="body2">
                    Login
                  </Link>
                </Typography>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                  Register
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FaGoogle />}
                  sx={{ mt: 2 }}
                  onClick={handleGoogleLogin}
                >
                  Register with Google
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
