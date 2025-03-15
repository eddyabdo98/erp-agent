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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Expense {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
}

const expenseCategories = [
  'Utilities',
  'Rent',
  'Salaries',
  'Office Supplies',
  'Marketing',
  'Insurance',
  'Maintenance',
  'Other',
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
  });

  const handleSaveExpense = () => {
    if (formData.description && formData.amount && formData.category) {
      const newExpense: Expense = {
        id: Math.random().toString(),
        date: new Date(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
      };
      setExpenses([...expenses, newExpense]);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      description: '',
      amount: '',
      category: '',
    });
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateExpensesByCategory = () => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const calculateMonthlyExpenses = () => {
    const monthlyData = expenses.reduce((acc, expense) => {
      const month = expense.date.toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Management</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Expense
        </Button>
      </div>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ${calculateTotalExpenses().toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Paper className="p-4">
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={calculateExpensesByCategory()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {calculateExpensesByCategory().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        <Paper className="p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calculateMonthlyExpenses()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell align="right" className="text-red-600">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Expense</DialogTitle>
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
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {expenseCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSaveExpense}
            variant="contained"
            color="primary"
            disabled={!formData.description || !formData.amount || !formData.category}
          >
            Save Expense
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 