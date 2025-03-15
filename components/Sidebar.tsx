'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Inventory,
  ShoppingCart,
  People,
  AttachMoney,
  Receipt,
  LocalShipping,
  Settings,
} from '@mui/icons-material';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Inventory', icon: Inventory, path: '/inventory' },
  { name: 'Sales', icon: ShoppingCart, path: '/sales' },
  { name: 'Purchases', icon: LocalShipping, path: '/purchases' },
  { name: 'Clients', icon: People, path: '/clients' },
  { name: 'Cash Register', icon: AttachMoney, path: '/cash' },
  { name: 'Expenses', icon: Receipt, path: '/expenses' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4">
        <h1 className={`font-bold ${isCollapsed ? 'text-center text-sm' : 'text-xl'}`}>
          {isCollapsed ? 'ERP' : 'ERP Agent'}
        </h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                pathname === item.path ? 'bg-gray-700 text-white' : ''
              }`}
            >
              <Icon className="h-6 w-6" />
              {!isCollapsed && <span className="ml-4">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-4 left-4 text-gray-300 hover:text-white"
      >
        {isCollapsed ? '→' : '←'}
      </button>
    </aside>
  );
} 