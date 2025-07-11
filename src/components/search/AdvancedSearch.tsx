import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Plus, Minus } from 'lucide-react';
import { SearchDropdown } from '../common/SearchDropdown';
import { getSearchSuggestions } from '../../data/searchSuggestions';

interface SearchFilter {
  id: string;
  category: string;
  operator: 'includes' | 'excludes' | 'equals' | 'greater_than' | 'less_than';
  value: string;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilter[], query: string) => void;
  onResultsCount: (count: number) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, onResultsCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);

  const categories = [
    { id: 'company', label: 'Company Name', suggestions: 'companies' },
    { id: 'position', label: 'Job Title', suggestions: 'positions' },
    { id: 'industry', label: 'Industry', suggestions: 'industries' },
    { id: 'location', label: 'Location', suggestions: 'locations' },
    { id: 'companySize', label: 'Company Size', suggestions: 'companySizes' },
    { id: 'revenue', label: 'Revenue Range', suggestions: 'revenues' },
    { id: 'technology', label: 'Technology Stack', suggestions: 'technologies' }
  ];

  const operators = [
    { id: 'includes', label: 'Contains' },
    { id: 'excludes', label: 'Does not contain' },
    { id: 'equals', label: 'Equals' },
    { id: 'greater_than', label: 'Greater than' },
    { id: 'less_than', label: 'Less than' }
  ];

  // Simulate real-time results count
  useEffect(() => {
    const timer = setTimeout(() => {
      const baseCount = 50000;
      const queryMultiplier = searchQuery.length > 0 ? 0.3 : 1;
      const filterMultiplier = Math.max(0.1, 1 - (filters.length * 0.2));
      const count = Math.floor(baseCount * queryMultiplier * filterMultiplier);
      setResultsCount(count);
      onResultsCount(count);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters, onResultsCount]);

  const addFilter = () => {
    const newFilter: SearchFilter = {
      id: Date.now().toString(),
      category: 'company',
      operator: 'includes',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: string, field: keyof SearchFilter, value: string) => {
    setFilters(filters.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const handleSearch = () => {
    onSearch(filters, searchQuery);
  };

  const clearAll = () => {
    setSearchQuery('');
    setFilters([]);
  };

  return (
    <div className="bg-[#2A2D31] rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Advanced Lead Search</h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">
            {resultsCount.toLocaleString()} potential matches
          </span>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center px-3 py-2 bg-[#1A1C1E] border border-gray-600 rounded-lg text-white hover:bg-[#3A3D41] transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced
          </button>
        </div>
      </div>

      {/* Main Search */}
      <div className="mb-6">
        <SearchDropdown
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search companies, people, or keywords..."
          suggestions={[
            ...getSearchSuggestions('companies').slice(0, 5),
            ...getSearchSuggestions('positions').slice(0, 5),
            ...getSearchSuggestions('industries').slice(0, 5)
          ]}
          onSuggestionSelect={(suggestion) => setSearchQuery(suggestion)}
        />
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mb-6 p-4 bg-[#1A1C1E] rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-white">Advanced Filters</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={addFilter}
                className="flex items-center px-3 py-1 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Filter
              </button>
              {filters.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {filters.map((filter, index) => (
              <div key={filter.id} className="flex items-center space-x-3">
                {index > 0 && (
                  <span className="text-sm text-gray-400 font-medium">AND</span>
                )}
                
                <select
                  value={filter.category}
                  onChange={(e) => updateFilter(filter.id, 'category', e.target.value)}
                  className="px-3 py-2 bg-[#2A2D31] border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={filter.operator}
                  onChange={(e) => updateFilter(filter.id, 'operator', e.target.value as any)}
                  className="px-3 py-2 bg-[#2A2D31] border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                >
                  {operators.map(op => (
                    <option key={op.id} value={op.id}>{op.label}</option>
                  ))}
                </select>

                <div className="flex-1">
                  <SearchDropdown
                    value={filter.value}
                    onChange={(value) => updateFilter(filter.id, 'value', value)}
                    placeholder="Enter value..."
                    suggestions={getSearchSuggestions(
                      categories.find(c => c.id === filter.category)?.suggestions as any || 'companies'
                    )}
                    onSuggestionSelect={(suggestion) => updateFilter(filter.id, 'value', suggestion)}
                  />
                </div>

                <button
                  onClick={() => removeFilter(filter.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearch}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg font-medium"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Leads
          </button>
          
          <button className="px-4 py-3 bg-[#1A1C1E] border border-gray-600 text-white rounded-lg hover:bg-[#3A3D41] transition-colors">
            Save Search
          </button>
        </div>

        <div className="text-sm text-gray-400">
          Search updates in real-time • {resultsCount.toLocaleString()} results
        </div>
      </div>
    </div>
  );
};