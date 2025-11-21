import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button, Input } from '@/components';

export interface TableSearchProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  placeholder = 'Search...',
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <div className="flex-1 relative">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <Button onClick={handleSearch} size="md">
        <Search size={20} />
      </Button>
    </div>
  );
};
