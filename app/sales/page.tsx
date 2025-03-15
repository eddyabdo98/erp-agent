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
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface SaleItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Sale {
  id: string;
  date: Date;
  clientName: string;
  items: SaleItem[];
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

const sampleItems = [
  { id: '1', name: 'Product A', price: 99.99, stock: 100 },
  { id: '2', name: 'Product B', price: 149.99, stock: 50 },
  { id: '3', name: 'Product C', price: 199.99, stock: 75 },
];

const sampleClients = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
];

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      const newItem: SaleItem = {
        id: Math.random().toString(),
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        quantity: quantity,
        price: selectedItem.price,
        total: selectedItem.price * quantity,
      };
      setSaleItems([...saleItems, newItem]);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setSaleItems(saleItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return saleItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSaveSale = () => {
    if (selectedClient && saleItems.length > 0) {
      const newSale: Sale = {
        id: Math.random().toString(),
        date: new Date(),
        clientName: selectedClient.name,
        items: saleItems,
        total: calculateTotal(),
        status: 'COMPLETED',
      };
      setSales([...sales, newSale]);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
    setSaleItems([]);
    setSelectedItem(null);
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales Management</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Sale
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Items</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date.toLocaleDateString()}</TableCell>
                <TableCell>{sale.clientName}</TableCell>
                <TableCell>{sale.items.length} items</TableCell>
                <TableCell align="right">${sale.total.toFixed(2)}</TableCell>
                <TableCell>{sale.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>New Sale</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <Autocomplete
              options={sampleClients}
              getOptionLabel={(option) => option.name}
              value={selectedClient}
              onChange={(_, newValue) => setSelectedClient(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Client" fullWidth />
              )}
            />

            <div className="flex space-x-2">
              <Autocomplete
                options={sampleItems}
                getOptionLabel={(option) => option.name}
                value={selectedItem}
                onChange={(_, newValue) => setSelectedItem(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Item" />
                )}
                className="flex-1"
              />
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-32"
              />
              <Button
                variant="contained"
                onClick={handleAddItem}
                disabled={!selectedItem || quantity <= 0}
              >
                Add
              </Button>
            </div>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {saleItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="flex justify-end">
              <div className="text-xl font-bold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSaveSale}
            variant="contained"
            color="primary"
            disabled={!selectedClient || saleItems.length === 0}
          >
            Complete Sale
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 