/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
} from '@mui/material';
import { LockOpen, Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { app } from '../../firebase/firebase.config';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const onSubmit = (data) => {
    const { email, password } = data;

    
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        reset(); // Clear form inputs
        navigate(from);
        setError(null);
        console.log('Login success');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setError('User not found');
        } else if (error.code === 'auth/wrong-password') {
          setError('Invalid password');
        } else {
          setError(error.message);
        }
        // console.error(error.message);
      });
  };

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
            navigate(from);
          })
          .catch((error) => {
            setError(error.response.data);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ my: 'auto', mb: 3, mt: 3 }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in Please
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <VisibilityOff onClick={handleTogglePasswordVisibility} />
                  ) : (
                    <Visibility onClick={handleTogglePasswordVisibility} />
                  )}
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              Don't have an account?
              <Link href="/signup" variant="body2">
                {" Sign Up"}
              </Link>
            </Grid>
            <Grid item xs={12} md={7}>
              <Button
                variant="outlined"
                onClick={handleGoogleLogin}
                startIcon={<FaGoogle />}
                fullWidth
              >
                Sign in with Google
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
