import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

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
  const [users, setUsers] = useState([
    {
      id: 1,
      image: 'https://source.unsplash.com/random/800x800/?user',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'student',
    },
    // Add more user objects here
  ]);

  const handleMakeInstructor = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        role: user.id === userId ? 'instructor' : user.role,
      }))
    );
  };

  const handleMakeAdmin = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        role: user.id === userId ? 'admin' : user.role,
      }))
    );
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
            <TableRow key={user.id}>
              <TableCell>
                <FixedSizeRoundedImage src={user.image} alt={user.name} />
              </TableCell>
              <SmallTextCell>{user.name}</SmallTextCell>
              <SmallTextCell>{user.email}</SmallTextCell>
              <SmallTextCell>{user.role}</SmallTextCell>
              <TableCell>
                <SmallButton
                  variant="outlined"
                  onClick={() => handleMakeInstructor(user.id)}
                  disabled={user.role === 'instructor'}
                >
                  Make Instructor
                </SmallButton>
                <SmallButton
                  variant="outlined"
                  onClick={() => handleMakeAdmin(user.id)}
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
