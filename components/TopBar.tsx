'use client';

import { useState } from 'react';
import { AccountCircle, Notifications, Search } from '@mui/icons-material';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Notifications className="text-gray-600" />
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
            <AccountCircle className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </button>
        </div>
      </div>
    </header>
  );
} 