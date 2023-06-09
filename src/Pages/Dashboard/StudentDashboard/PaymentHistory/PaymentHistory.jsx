import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const SmallTextCell = styled(TableCell)(() => ({
  fontSize: '0.65rem',
}));

const PaymentHistory = () => {
  const paymentHistory = [
    {
      id: 1,
      className: 'Class A',
      transactionId: 'ABC123XYZ',
      datetime: '2023-06-01 10:30 AM',
      amount: 50,
    },
    // Add more payment history items here
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="payment history table">
        <TableHead>
          <TableRow>
            <SmallTextCell>Class Name</SmallTextCell>
            <SmallTextCell>Transaction ID</SmallTextCell>
            <SmallTextCell>Date & Time</SmallTextCell>
            <SmallTextCell>Amount</SmallTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentHistory.map((payment) => (
            <TableRow key={payment.id}>
              <SmallTextCell>{payment.className}</SmallTextCell>
              <SmallTextCell>{payment.transactionId}</SmallTextCell>
              <SmallTextCell>{payment.datetime}</SmallTextCell>
              <SmallTextCell>{payment.amount}</SmallTextCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentHistory;
