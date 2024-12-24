import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for medicines..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
}

export default SearchBar;