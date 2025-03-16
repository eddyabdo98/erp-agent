'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Chip,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

interface Supplier {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  active: boolean;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError('Failed to load suppliers');
    }
  };

  const handleOpenDialog = (supplier?: Supplier) => {
    if (supplier) {
      setSelectedSupplier(supplier);
      setFormData({
        name: supplier.name,
        email: supplier.email || '',
        phone: supplier.phone || '',
        address: supplier.address || '',
        taxId: supplier.taxId || '',
      });
    } else {
      setSelectedSupplier(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        taxId: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSupplier(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      taxId: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = selectedSupplier ? `/api/suppliers/${selectedSupplier.id}` : '/api/suppliers';
      const method = selectedSupplier ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save supplier');

      handleCloseDialog();
      fetchSuppliers();
    } catch (err) {
      setError('Failed to save supplier');
    }
  };

  const handleToggleActive = async (supplierId: number, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (!response.ok) throw new Error('Failed to update supplier status');

      fetchSuppliers();
    } catch (err) {
      setError('Failed to update supplier status');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <h1>Supplier Management</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add New Supplier
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Tax ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.taxId}</TableCell>
                <TableCell>
                  <Chip
                    label={supplier.active ? 'Active' : 'Inactive'}
                    color={supplier.active ? 'success' : 'error'}
                    onClick={() => handleToggleActive(supplier.id, supplier.active)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(supplier)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Tax ID"
              value={formData.taxId}
              onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedSupplier ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 