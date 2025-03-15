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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface PurchaseItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  cost: number;
  total: number;
}

interface Purchase {
  id: string;
  date: Date;
  supplierName: string;
  items: PurchaseItem[];
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

const sampleItems = [
  { id: '1', name: 'Product A', cost: 50.00 },
  { id: '2', name: 'Product B', cost: 75.00 },
  { id: '3', name: 'Product C', cost: 100.00 },
];

const sampleSuppliers = [
  { id: '1', name: 'Supplier A' },
  { id: '2', name: 'Supplier B' },
  { id: '3', name: 'Supplier C' },
];

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      const newItem: PurchaseItem = {
        id: Math.random().toString(),
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        quantity: quantity,
        cost: selectedItem.cost,
        total: selectedItem.cost * quantity,
      };
      setPurchaseItems([...purchaseItems, newItem]);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setPurchaseItems(purchaseItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return purchaseItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSavePurchase = () => {
    if (selectedSupplier && purchaseItems.length > 0) {
      const newPurchase: Purchase = {
        id: Math.random().toString(),
        date: new Date(),
        supplierName: selectedSupplier.name,
        items: purchaseItems,
        total: calculateTotal(),
        status: 'COMPLETED',
      };
      setPurchases([...purchases, newPurchase]);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSupplier(null);
    setPurchaseItems([]);
    setSelectedItem(null);
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Purchase Management</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Purchase
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Items</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.date.toLocaleDateString()}</TableCell>
                <TableCell>{purchase.supplierName}</TableCell>
                <TableCell>{purchase.items.length} items</TableCell>
                <TableCell align="right">${purchase.total.toFixed(2)}</TableCell>
                <TableCell>{purchase.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>New Purchase</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <Autocomplete
              options={sampleSuppliers}
              getOptionLabel={(option) => option.name}
              value={selectedSupplier}
              onChange={(_, newValue) => setSelectedSupplier(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Supplier" fullWidth />
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
                    <TableCell align="right">Cost</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.cost.toFixed(2)}</TableCell>
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
            onClick={handleSavePurchase}
            variant="contained"
            color="primary"
            disabled={!selectedSupplier || purchaseItems.length === 0}
          >
            Complete Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 