import React, { useState } from 'react';
import { Lead } from '../../types';
import { Brain, Zap, Mail, Phone, Linkedin, Building, MapPin, TrendingUp } from 'lucide-react';

interface EnrichmentPanelProps {
  leads: Lead[];
  onEnrich: (leadId: string) => void;
}

export const EnrichmentPanel: React.FC<EnrichmentPanelProps> = ({ leads, onEnrich }) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [enriching, setEnriching] = useState(false);

  const handleBulkEnrich = async () => {
    setEnriching(true);
    
    // Simulate enrichment process
    for (const leadId of selectedLeads) {
      await new Promise(resolve => setTimeout(resolve, 500));
      onEnrich(leadId);
    }
    
    setEnriching(false);
    setSelectedLeads([]);
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const enrichmentServices = [
    {
      name: 'Contact Finder',
      description: 'Find email addresses and phone numbers',
      icon: Mail,
      color: 'blue',
      accuracy: '94%'
    },
    {
      name: 'Social Profiles',
      description: 'Discover LinkedIn and social media profiles',
      icon: Linkedin,
      color: 'indigo',
      accuracy: '89%'
    },
    {
      name: 'Company Intelligence',
      description: 'Get detailed company information and metrics',
      icon: Building,
      color: 'green',
      accuracy: '96%'
    },
    {
      name: 'Intent Signals',
      description: 'Identify buying intent and engagement signals',
      icon: TrendingUp,
      color: 'purple',
      accuracy: '87%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Enrichment Engine</h2>
          <p className="text-gray-600">Enhance your leads with AI-powered data enrichment</p>
        </div>

        {/* Enrichment Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {enrichmentServices.map((service, index) => (
            <div key={index} className={`p-4 bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 rounded-lg border border-${service.color}-200`}>
              <div className="flex items-center mb-3">
                <div className={`p-2 bg-${service.color}-500 rounded-lg mr-3`}>
                  <service.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold text-${service.color}-900 text-sm`}>{service.name}</h3>
                  <p className={`text-xs text-${service.color}-700`}>{service.accuracy} accuracy</p>
                </div>
              </div>
              <p className={`text-xs text-${service.color}-800`}>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">
              {selectedLeads.length} leads selected
            </span>
            <button
              onClick={() => setSelectedLeads(leads.map(l => l.id))}
              className="text-sm text-blue-600 hover:text-blue-700 mr-4"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedLeads([])}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Clear Selection
            </button>
          </div>
          
          <button
            onClick={handleBulkEnrich}
            disabled={selectedLeads.length === 0 || enriching}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Brain className="w-4 h-4 mr-2" />
            {enriching ? 'Enriching...' : 'Enrich Selected'}
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Leads Available for Enrichment</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leads.slice(0, 10).map((lead) => (
            <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => toggleLeadSelection(lead.id)}
                    className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-900 mr-3">{lead.name}</h4>
                      <span className="text-sm text-gray-600">{lead.position}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {lead.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {lead.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Data Completeness Indicators */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${lead.email ? 'bg-green-500' : 'bg-gray-300'}`} title="Email" />
                    <div className={`w-2 h-2 rounded-full ${lead.phone ? 'bg-green-500' : 'bg-gray-300'}`} title="Phone" />
                    <div className={`w-2 h-2 rounded-full ${lead.linkedin ? 'bg-green-500' : 'bg-gray-300'}`} title="LinkedIn" />
                  </div>
                  
                  <button
                    onClick={() => onEnrich(lead.id)}
                    className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Enrich
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};