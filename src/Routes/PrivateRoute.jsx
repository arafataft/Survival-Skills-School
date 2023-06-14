import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <CircularProgress />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login" />;
};

export default PrivateRoute;
