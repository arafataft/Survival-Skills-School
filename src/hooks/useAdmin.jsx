import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        if (!loading && user) {
          const response = await fetch(`http://localhost:5000/users/admin/${user.email}`);
          const data = await response.json();
          setIsAdmin(data.admin);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsAdminLoading(false);
      }
    };

    fetchAdminStatus();
  }, [loading, user]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
