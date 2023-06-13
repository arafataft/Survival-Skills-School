import { Box, Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const ErrorImage = styled('img')({
  display: 'block',
  margin: '0 auto',
  height: 400,
});

const ErrorPage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ErrorImage src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" alt="404 Error" />
        </Box>
        <Typography variant="body1" align="center" mb={2}>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body2" align="center" mb={4}>
          The page you are looking for could not be found.
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/" color="primary">
            Back to homepage
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default ErrorPage;
