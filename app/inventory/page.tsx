'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Item {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  category: string;
}

const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Product A',
    sku: 'SKU001',
    description: 'Description for Product A',
    price: 99.99,
    cost: 50.00,
    stock: 100,
    minStock: 20,
    category: 'Electronics',
  },
  // Add more sample items as needed
];

export default function Inventory() {
  const [items, setItems] = useState<Item[]>(sampleItems);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = (item?: Item) => {
    if (item) {
      setSelectedItem(item);
    } else {
      setSelectedItem(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Item
        </Button>
      </div>

      <div className="w-full max-w-md">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Min Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">${item.cost.toFixed(2)}</TableCell>
                <TableCell align="right">{item.stock}</TableCell>
                <TableCell align="right">{item.minStock}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpen(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ItemDialog
        open={open}
        onClose={handleClose}
        item={selectedItem}
        onSave={(item) => {
          // Handle save logic here
          console.log('Save item:', item);
          handleClose();
        }}
      />
    </div>
  );
}

interface ItemDialogProps {
  open: boolean;
  onClose: () => void;
  item: Item | null;
  onSave: (item: Partial<Item>) => void;
}

function ItemDialog({ open, onClose, item, onSave }: ItemDialogProps) {
  const [formData, setFormData] = useState<Partial<Item>>(
    item || {
      name: '',
      sku: '',
      description: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      category: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="sku"
            label="SKU"
            value={formData.sku}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="cost"
            label="Cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="stock"
            label="Current Stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="minStock"
            label="Minimum Stock"
            type="number"
            value={formData.minStock}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            className="col-span-2"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(formData)} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
} 