import React, { useState } from 'react';
import { X, Linkedin, Globe, Search, Play, Pause, CheckCircle } from 'lucide-react';
import { SearchDropdown } from '../common/SearchDropdown';
import { getSearchSuggestions } from '../../data/searchSuggestions';

interface ScrapeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (leads: any[]) => void;
}

export const ScrapeModal: React.FC<ScrapeModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [activeSource, setActiveSource] = useState<'linkedin' | 'apollo' | 'company'>('linkedin');
  const [scraping, setScraping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    companySize: '',
    jobTitle: ''
  });

  if (!isOpen) return null;

  const handleStartScrape = async () => {
    setScraping(true);
    setProgress(0);

    // Simulate scraping progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScraping(false);
          
          // Generate mock scraped leads
          const mockLeads = [
            {
              name: 'Reid Hoffman',
              email: 'reid@linkedin.com',
              company: 'LinkedIn',
              position: 'Co-founder',
              industry: 'Technology',
              companySize: '5000+',
              revenue: '$500M+',
              location: 'San Francisco, CA',
              linkedin: 'https://www.linkedin.com/in/reidhoffman/',
              phone: '+1 (650) 687-3600',
              website: 'https://www.linkedin.com',
              source: 'LinkedIn Scraper',
              status: 'new',
              tags: ['scraped', 'founder', 'high-value']
            },
            {
              name: 'Drew Houston',
              email: 'drew@dropbox.com',
              company: 'Dropbox',
              position: 'CEO',
              industry: 'Technology',
              companySize: '1001-5000',
              revenue: '$100M-$500M',
              location: 'San Francisco, CA',
              linkedin: 'https://www.linkedin.com/in/drewhouston/',
              phone: '+1 (415) 857-6800',
              website: 'https://www.dropbox.com',
              source: 'LinkedIn Scraper',
              status: 'new',
              tags: ['scraped', 'ceo', 'cloud-storage']
            }
          ];
          
          onComplete(mockLeads);
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const sources = [
    {
      id: 'linkedin',
      name: 'LinkedIn Sales Navigator',
      icon: Linkedin,
      description: 'Extract profiles from LinkedIn searches',
      color: 'blue'
    },
    {
      id: 'apollo',
      name: 'Apollo.io',
      icon: Search,
      description: 'Scrape from Apollo database',
      color: 'purple'
    },
    {
      id: 'company',
      name: 'Company Websites',
      icon: Globe,
      description: 'Extract team pages and directories',
      color: 'green'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Lead Scraping Engine</h2>
              <p className="text-gray-600">Extract qualified leads from multiple sources</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Source Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Source</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setActiveSource(source.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeSource === source.id
                      ? `border-${source.color}-500 bg-${source.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <source.icon className={`w-5 h-5 mr-2 ${
                      activeSource === source.id ? `text-${source.color}-600` : 'text-gray-500'
                    }`} />
                    <span className={`font-medium ${
                      activeSource === source.id ? `text-${source.color}-900` : 'text-gray-900'
                    }`}>
                      {source.name}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    activeSource === source.id ? `text-${source.color}-700` : 'text-gray-600'
                  }`}>
                    {source.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Search Configuration */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Configuration</h3>
            
            {activeSource === 'linkedin' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Search URL or Keywords
                  </label>
                  <SearchDropdown
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Paste LinkedIn Sales Navigator URL or enter keywords"
                    suggestions={[
                      ...getSearchSuggestions('positions'),
                      ...getSearchSuggestions('companies'),
                      ...getSearchSuggestions('industries')
                    ]}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={filters.industry}
                      onChange={(e) => setFilters({...filters, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Industries</option>
                      {getSearchSuggestions('industries').slice(0, 10).map(industry => (
                        <option key={industry} value={industry.toLowerCase()}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <SearchDropdown
                      value={filters.location}
                      onChange={(value) => setFilters({...filters, location: value})}
                      placeholder="e.g., San Francisco, CA"
                      suggestions={getSearchSuggestions('locations')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select
                      value={filters.companySize}
                      onChange={(e) => setFilters({...filters, companySize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Any Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <SearchDropdown
                      value={filters.jobTitle}
                      onChange={(value) => setFilters({...filters, jobTitle: value})}
                      placeholder="e.g., CEO, VP Sales, CTO"
                      suggestions={getSearchSuggestions('positions')}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSource === 'apollo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apollo.io Search Query
                  </label>
                  <SearchDropdown
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Enter company names, domains, or search criteria"
                    suggestions={[
                      ...getSearchSuggestions('companies'),
                      ...getSearchSuggestions('industries'),
                      ...getSearchSuggestions('positions')
                    ]}
                  />
                </div>
              </div>
            )}

            {activeSource === 'company' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website URLs
                  </label>
                  <textarea
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Enter company website URLs (one per line)\nhttps://microsoft.com\nhttps://google.com\nhttps://apple.com`}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Scraping Progress */}
          {scraping && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Scraping in progress...</span>
                <span className="text-sm text-blue-700">{progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Extracting lead data and calculating AI scores...
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartScrape}
              disabled={scraping || !searchQuery.trim()}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scraping ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Scraping...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Scraping
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};