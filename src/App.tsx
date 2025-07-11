import React, { useState } from 'react';
import { HomePage } from './components/homepage/HomePage';
import { AdvancedSearch } from './components/search/AdvancedSearch';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { ScoreDistributionChart } from './components/dashboard/ScoreDistributionChart';
import { TopIndustriesChart } from './components/dashboard/TopIndustriesChart';
import { LeadCard } from './components/leads/LeadCard';
import { LeadDetail } from './components/leads/LeadDetail';
import { LeadFilters } from './components/leads/LeadFilters';
import { ImportModal } from './components/import/ImportModal';
import { ScrapeModal } from './components/scraping/ScrapeModal';
import { EnrichmentPanel } from './components/enrichment/EnrichmentPanel';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { SearchDropdown } from './components/common/SearchDropdown';
import { useLeads } from './hooks/useLeads';
import { getSearchSuggestions } from './data/searchSuggestions';
import { Lead, FilterOptions } from './types';
import { SortAsc, SortDesc } from 'lucide-react';

function App() {
  const { leads, loading, addLead, updateLead, enrichLead } = useLeads();
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'leads' | 'scraper' | 'enrichment' | 'analytics'>('home');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'dateAdded'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showImport, setShowImport] = useState(false);
  const [showScraper, setShowScraper] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    scoreRange: [0, 100],
    industries: [],
    companySizes: [],
    statuses: [],
    sources: [],
    dateRange: ['', '']
  });

  // Get search suggestions based on current leads
  const getLeadSearchSuggestions = () => {
    const suggestions = new Set<string>();
    
    leads.forEach(lead => {
      suggestions.add(lead.name);
      suggestions.add(lead.company);
      suggestions.add(lead.email);
      suggestions.add(lead.position);
      suggestions.add(lead.industry);
      suggestions.add(lead.location);
    });
    
    // Add general suggestions
    getSearchSuggestions('names').forEach(name => suggestions.add(name));
    getSearchSuggestions('companies').forEach(company => suggestions.add(company));
    getSearchSuggestions('positions').forEach(position => suggestions.add(position));
    
    return Array.from(suggestions).sort();
  };

  // Calculate dashboard stats
  const dashboardStats = {
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(lead => lead.score >= 80).length,
    averageScore: Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length || 0),
    conversionRate: Math.round((leads.filter(lead => lead.status === 'converted').length / leads.length) * 100 || 0)
  };

  const scoreDistribution = [
    { range: '90-100', count: leads.filter(lead => lead.score >= 90).length },
    { range: '80-89', count: leads.filter(lead => lead.score >= 80 && lead.score < 90).length },
    { range: '70-79', count: leads.filter(lead => lead.score >= 70 && lead.score < 80).length },
    { range: '60-69', count: leads.filter(lead => lead.score >= 60 && lead.score < 70).length },
    { range: '50-59', count: leads.filter(lead => lead.score >= 50 && lead.score < 60).length },
    { range: '0-49', count: leads.filter(lead => lead.score < 50).length }
  ];

  const topIndustries = Object.entries(
    leads.reduce((acc, lead) => {
      acc[lead.industry] = acc[lead.industry] || { count: 0, totalScore: 0 };
      acc[lead.industry].count++;
      acc[lead.industry].totalScore += lead.score;
      return acc;
    }, {} as Record<string, { count: number; totalScore: number }>)
  )
    .map(([name, data]) => ({
      name,
      count: data.count,
      avgScore: Math.round(data.totalScore / data.count)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Filter and sort leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScore = lead.score >= filters.scoreRange[0] && lead.score <= filters.scoreRange[1];
    const matchesIndustry = filters.industries.length === 0 || filters.industries.includes(lead.industry);
    const matchesCompanySize = filters.companySizes.length === 0 || filters.companySizes.includes(lead.companySize);
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(lead.status);
    const matchesSource = filters.sources.length === 0 || filters.sources.includes(lead.source);
    
    return matchesSearch && matchesScore && matchesIndustry && matchesCompanySize && matchesStatus && matchesSource;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
  });

  const handleImport = (data: any[]) => {
    data.forEach(item => {
      addLead(item);
    });
  };

  const handleScrapeComplete = (scrapedLeads: any[]) => {
    scrapedLeads.forEach(lead => {
      addLead(lead);
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Company', 'Position', 'Industry', 'Score', 'Status', 'LinkedIn', 'Phone'],
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.company,
        lead.position,
        lead.industry,
        lead.score,
        lead.status,
        lead.linkedin || '',
        lead.phone || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saasquatch_leads_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAdvancedSearch = (filters: any[], query: string) => {
    console.log('Advanced search:', { filters, query });
    // Implement search logic here
    setActiveTab('leads');
  };

  const handleResultsCount = (count: number) => {
    console.log('Results count:', count);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1C1E] text-white">
      {activeTab === 'home' ? (
        <HomePage 
          onNavigate={(tab) => setActiveTab(tab as any)}
          onStartScrape={() => setShowScraper(true)}
        />
      ) : (
        <>
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="ml-64">
        <TopBar 
          onImport={() => setShowImport(true)}
          onScrape={() => setShowScraper(true)}
          onExport={handleExport}
        />
        
        <main className="p-6">
        {activeTab === 'search' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Advanced Lead Search</h1>
              <p className="text-gray-400">Find qualified prospects with precision targeting</p>
            </div>
            <AdvancedSearch 
              onSearch={handleAdvancedSearch}
              onResultsCount={handleResultsCount}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Lead Intelligence Dashboard</h1>
              <p className="text-gray-400">AI-powered lead scoring and qualification for SaasquatchLeads</p>
            </div>
            <DashboardStats stats={dashboardStats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScoreDistributionChart data={scoreDistribution} />
              <TopIndustriesChart data={topIndustries} />
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Qualified Leads ({filteredLeads.length})</h2>
                  <p className="text-gray-400">AI-scored prospects ready for outreach</p>
                </div>
                <div className="flex items-center space-x-3">
                  <LeadFilters 
                    filters={filters}
                    onFiltersChange={setFilters}
                    isOpen={showFilters}
                    onToggle={() => setShowFilters(!showFilters)}
                  />
                  <div className="flex items-center space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 bg-[#2A2D31] border border-gray-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="score">AI Score</option>
                      <option value="name">Name</option>
                      <option value="dateAdded">Date Added</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 bg-[#2A2D31] border border-gray-600 rounded-lg hover:bg-[#3A3D41] transition-colors"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4 text-white" /> : <SortDesc className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                </div>
              </div>

              <SearchDropdown
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search leads by name, company, email, position..."
                suggestions={getLeadSearchSuggestions()}
                onSuggestionSelect={(suggestion) => setSearchTerm(suggestion)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <LeadCard 
                  key={lead.id}
                  lead={lead}
                  onSelect={setSelectedLead}
                  onEnrich={(id) => enrichLead(id)}
                  isSelected={selectedLead?.id === lead.id}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scraper' && (
          <div className="bg-[#2A2D31] rounded-lg border border-gray-700 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Lead Scraping Engine</h2>
              <p className="text-gray-400">Extract qualified leads from LinkedIn, company websites, and directories</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-lg border border-blue-700/30">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-[#2563EB] rounded-lg mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">LinkedIn Scraper</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">Extract profiles from LinkedIn Sales Navigator searches</p>
                <button 
                  onClick={() => setShowScraper(true)}
                  className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start LinkedIn Scrape
                </button>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-lg border border-green-700/30">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-[#22C55E] rounded-lg mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Company Directory</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">Scrape employee data from company websites</p>
                <button className="w-full px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-green-600 transition-colors">
                  Scrape Company
                </button>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-lg border border-purple-700/30">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-[#6366F1] rounded-lg mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Industry Lists</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">Extract from industry-specific directories</p>
                <button className="w-full px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-indigo-600 transition-colors">
                  Browse Industries
                </button>
              </div>
            </div>

            <div className="bg-[#1A1C1E] rounded-lg p-6 border border-gray-700">
              <h3 className="font-semibold text-white mb-4">Recent Scraping Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#2A2D31] rounded-lg border border-gray-700">
                  <div>
                    <p className="font-medium text-white">LinkedIn Sales Navigator - Tech CEOs</p>
                    <p className="text-sm text-gray-400">Completed 2 hours ago • 47 leads extracted</p>
                  </div>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2D31] rounded-lg border border-gray-700">
                  <div>
                    <p className="font-medium text-white">Apollo.io - Marketing Directors</p>
                    <p className="text-sm text-gray-400">Completed 5 hours ago • 23 leads extracted</p>
                  </div>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Completed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'enrichment' && (
          <EnrichmentPanel leads={filteredLeads} onEnrich={enrichLead} />
        )}

        {activeTab === 'analytics' && (
          <div className="bg-[#2A2D31] rounded-lg border border-gray-700 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Lead Intelligence Analytics</h2>
              <p className="text-gray-400">Advanced insights and performance metrics</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 rounded-lg border border-indigo-700/30">
                <h3 className="font-semibold text-white mb-4">Conversion Funnel</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Total Scraped</span>
                    <span className="font-bold text-white">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">AI Qualified (80+)</span>
                    <span className="font-bold text-white">312</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Contacted</span>
                    <span className="font-bold text-white">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Responded</span>
                    <span className="font-bold text-white">23</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-teal-900/20 to-teal-800/20 rounded-lg border border-teal-700/30">
                <h3 className="font-semibold text-white mb-4">Source Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">LinkedIn</span>
                    <span className="font-bold text-white">87% quality</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Apollo.io</span>
                    <span className="font-bold text-white">72% quality</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Company Sites</span>
                    <span className="font-bold text-white">94% quality</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1C1E] rounded-lg p-6 border border-gray-700">
              <h3 className="font-semibold text-white mb-4">AI Scoring Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-[#2A2D31] rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Top Scoring Factors</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• C-level positions (+25 points)</li>
                    <li>• Tech industry (+20 points)</li>
                    <li>• 100-500 employees (+15 points)</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#2A2D31] rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Negative Indicators</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No LinkedIn profile (-15 points)</li>
                    <li>• Generic email (-10 points)</li>
                    <li>• Startup stage (-8 points)</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#2A2D31] rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">Recommendations</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Focus on SaaS companies</li>
                    <li>• Target VP+ positions</li>
                    <li>• Prioritize warm introductions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>
        </>
      )}

      {selectedLead && (
        <LeadDetail 
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={(updates) => updateLead(selectedLead.id, updates)}
        />
      )}

      <ImportModal 
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />

      <ScrapeModal
        isOpen={showScraper}
        onClose={() => setShowScraper(false)}
        onComplete={handleScrapeComplete}
      />
    </div>
  );
}

export default App;