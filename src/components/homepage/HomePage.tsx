import React, { useState } from 'react';
import { Search, Zap, BarChart3, Users, ArrowRight, Target, Brain, TrendingUp, Play, Star, CheckCircle } from 'lucide-react';
import { SearchDropdown } from '../common/SearchDropdown';
import { getSearchSuggestions } from '../../data/searchSuggestions';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onStartScrape: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onStartScrape }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'companies' | 'positions' | 'industries'>('companies');

  const features = [
    {
      icon: Zap,
      title: 'Smart Scrape',
      description: 'AI-powered lead extraction from LinkedIn, Apollo, and company websites',
      action: () => onStartScrape(),
      color: 'from-[#6366F1] to-[#8B5CF6]',
      stats: '10K+ leads extracted daily'
    },
    {
      icon: Search,
      title: 'Lead Search',
      description: 'Advanced search with real-time filters and predictive suggestions',
      action: () => onNavigate('leads'),
      color: 'from-[#2563EB] to-[#3B82F6]',
      stats: '500M+ contacts database'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Deep insights into lead quality, conversion rates, and performance',
      action: () => onNavigate('analytics'),
      color: 'from-[#22C55E] to-[#16A34A]',
      stats: '95% accuracy rate'
    }
  ];

  const quickStats = [
    { label: 'Active Users', value: '50K+', change: '+12%' },
    { label: 'Leads Generated', value: '2.5M+', change: '+25%' },
    { label: 'Companies Tracked', value: '100K+', change: '+18%' },
    { label: 'Success Rate', value: '94%', change: '+3%' }
  ];

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Navigation Header */}
      <nav className="bg-[#1E2328] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-[#2563EB] to-[#6366F1] rounded-lg mr-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">SaasquatchLeads</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate('leads')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Leads
              </button>
              <button 
                onClick={() => onNavigate('analytics')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Analytics
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#6366F1] text-white rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 via-[#6366F1]/5 to-[#8B5CF6]/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Find Your Next
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] to-[#6366F1] bg-clip-text text-transparent">
                Best Customer
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The most advanced AI-powered lead generation platform. Find, qualify, and convert prospects with unprecedented accuracy.
            </p>
            
            {/* Main Search Interface */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-[#1E2328] rounded-2xl border border-gray-700 p-8 shadow-2xl">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setSearchType('companies')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      searchType === 'companies' 
                        ? 'bg-[#2563EB] text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Companies
                  </button>
                  <button
                    onClick={() => setSearchType('positions')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      searchType === 'positions' 
                        ? 'bg-[#2563EB] text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Job Titles
                  </button>
                  <button
                    onClick={() => setSearchType('industries')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      searchType === 'industries' 
                        ? 'bg-[#2563EB] text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Industries
                  </button>
                </div>
                
                <SearchDropdown
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder={`Search ${searchType}... (e.g., ${
                    searchType === 'companies' ? 'Microsoft, Google, Apple' :
                    searchType === 'positions' ? 'CEO, VP Sales, CTO' :
                    'Technology, Healthcare, Finance'
                  })`}
                  suggestions={getSearchSuggestions(searchType)}
                  onSuggestionSelect={(suggestion) => setSearchQuery(suggestion)}
                  className="text-lg"
                />
                
                <div className="flex items-center justify-center mt-6 space-x-4">
                  <button
                    onClick={() => onNavigate('leads')}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg font-medium"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Leads
                  </button>
                  <button
                    onClick={onStartScrape}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg font-medium"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Smart Scrape
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-[#1E2328] rounded-lg border border-gray-700 p-6 text-center">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-xs text-[#22C55E]">{stat.change} this month</div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1E2328] rounded-xl border border-gray-700 p-8 hover:border-gray-600 transition-all duration-200 group">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="text-sm text-[#2563EB] mb-6">{feature.stats}</div>
              <button
                onClick={feature.action}
                className="flex items-center text-white hover:text-[#2563EB] transition-colors group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="bg-[#1E2328] rounded-xl border border-gray-700 p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Trusted by 50,000+ Sales Teams</h3>
            <p className="text-gray-400">Join the leading companies using SaasquatchLeads</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-lg font-bold text-white">Microsoft</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Salesforce</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">HubSpot</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Stripe</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1E2328] rounded-xl border border-gray-700 p-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Platform Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0F1419] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#22C55E] rounded-full mr-3"></div>
                <span className="text-sm text-gray-400">2 minutes ago</span>
              </div>
              <p className="text-white font-medium">LinkedIn scrape completed</p>
              <p className="text-sm text-gray-400">147 new leads extracted from Tech industry</p>
            </div>
            
            <div className="bg-[#0F1419] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#2563EB] rounded-full mr-3"></div>
                <span className="text-sm text-gray-400">5 minutes ago</span>
              </div>
              <p className="text-white font-medium">AI enrichment batch processed</p>
              <p className="text-sm text-gray-400">89 leads enriched with contact data</p>
            </div>
            
            <div className="bg-[#0F1419] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-[#6366F1] rounded-full mr-3"></div>
                <span className="text-sm text-gray-400">12 minutes ago</span>
              </div>
              <p className="text-white font-medium">High-value lead identified</p>
              <p className="text-sm text-gray-400">CEO at Fortune 500 company scored 96/100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};