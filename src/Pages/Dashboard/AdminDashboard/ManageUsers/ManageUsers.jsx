import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const SmallButton = styled(Button)(({ theme }) => ({
  fontSize: '0.55rem',
  padding: theme.spacing(0.5),
  marginRight: theme.spacing(1),
}));

const FixedSizeRoundedImage = styled('img')({
  width: '70px',
  height: '70px',
  borderRadius: '50%',
});

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { axiosSecure } = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const handleMakeInstructor = async (userId) => {
    try {
      await axiosSecure.put(`/users/${userId}/role`, { role: 'instructor' });
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          role: user._id === userId ? 'instructor' : user.role,
        }))
      );
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.put(`/users/${userId}/role`, { role: 'admin' });
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          role: user._id === userId ? 'admin' : user.role,
        }))
      );
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="manage users table">
        <TableHead>
          <TableRow>
            <SmallTextCell>User Image</SmallTextCell>
            <SmallTextCell>User Name</SmallTextCell>
            <SmallTextCell>User Email</SmallTextCell>
            <SmallTextCell>User Role</SmallTextCell>
            <SmallTextCell>Actions</SmallTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <FixedSizeRoundedImage src={user.photo} alt={user.name} />
              </TableCell>
              <SmallTextCell>{user.name}</SmallTextCell>
              <SmallTextCell>{user.email}</SmallTextCell>
              <SmallTextCell>{user.role}</SmallTextCell>
              <TableCell>
                <SmallButton
                  variant="outlined"
                  onClick={() => handleMakeInstructor(user._id)}
                  disabled={user.role === 'instructor'}
                >
                  Make Instructor
                </SmallButton>
                <SmallButton
                  variant="outlined"
                  onClick={() => handleMakeAdmin(user._id)}
                  disabled={user.role === 'admin'}
                >
                  Make Admin
                </SmallButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsers;
