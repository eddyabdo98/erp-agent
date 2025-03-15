'use client';

import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface CashTransaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'IN' | 'OUT';
  reference: string;
}

export default function CashRegister() {
  const [transactions, setTransactions] = useState<CashTransaction[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'IN',
    reference: '',
  });

  const handleSaveTransaction = () => {
    if (formData.description && formData.amount) {
      const newTransaction: CashTransaction = {
        id: Math.random().toString(),
        date: new Date(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        type: formData.type as 'IN' | 'OUT',
        reference: formData.reference,
      };
      setTransactions([...transactions, newTransaction]);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      description: '',
      amount: '',
      type: 'IN',
      reference: '',
    });
  };

  const calculateBalance = () => {
    return transactions.reduce((sum, transaction) => {
      return sum + (transaction.type === 'IN' ? transaction.amount : -transaction.amount);
    }, 0);
  };

  const calculateDailyTotal = (type: 'IN' | 'OUT') => {
    const today = new Date();
    return transactions
      .filter(
        (transaction) =>
          transaction.type === type &&
          transaction.date.toDateString() === today.toDateString()
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cash Register</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
            <p className={`text-2xl font-bold ${calculateBalance() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${calculateBalance().toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Today's Income</h3>
            <p className="text-2xl font-bold text-green-600">
              ${calculateDailyTotal('IN').toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Today's Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              ${calculateDailyTotal('OUT').toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.reference}</TableCell>
                <TableCell
                  align="right"
                  className={transaction.type === 'IN' ? 'text-green-600' : 'text-red-600'}
                >
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Transaction</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="IN">Cash In</MenuItem>
                <MenuItem value="OUT">Cash Out</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              fullWidth
              helperText="e.g., Invoice number, Receipt number"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSaveTransaction}
            variant="contained"
            color="primary"
            disabled={!formData.description || !formData.amount}
          >
            Save Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 