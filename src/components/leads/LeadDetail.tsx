import React, { useState } from 'react';
import { Lead } from '../../types';
import { ScoreCircle } from '../common/ScoreCircle';
import { StatusBadge } from '../common/StatusBadge';
import { Building, MapPin, Calendar, Mail, Phone, Linkedin, Target, TrendingUp, Edit3, Save, X } from 'lucide-react';

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
  onUpdate: (updates: Partial<Lead>) => void;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onClose, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);

  const alignmentFactors = [
    { key: 'industry', label: 'Industry Fit', value: lead.alignment.industry, weight: '25%' },
    { key: 'companySize', label: 'Company Size', value: lead.alignment.companySize, weight: '20%' },
    { key: 'revenue', label: 'Revenue Range', value: lead.alignment.revenue, weight: '20%' },
    { key: 'position', label: 'Position Level', value: lead.alignment.position, weight: '15%' },
    { key: 'geography', label: 'Geography', value: lead.alignment.geography, weight: '10%' },
    { key: 'engagement', label: 'Engagement', value: lead.alignment.engagement, weight: '10%' }
  ];

  const getRecommendations = (score: number) => {
    if (score >= 90) {
      return [
        {
          type: 'urgent',
          title: 'Immediate Action Required',
          description: 'Schedule a demo call within 24 hours - this is a hot lead!',
          icon: Target,
          color: 'red'
        },
        {
          type: 'high',
          title: 'Personalized Outreach',
          description: 'Send a highly personalized message referencing their recent company news',
          icon: Mail,
          color: 'orange'
        }
      ];
    } else if (score >= 80) {
      return [
        {
          type: 'high',
          title: 'Priority Follow-up',
          description: 'Reach out within 48 hours with relevant case study',
          icon: Target,
          color: 'yellow'
        },
        {
          type: 'medium',
          title: 'Social Engagement',
          description: 'Engage with their LinkedIn posts before reaching out',
          icon: Linkedin,
          color: 'blue'
        }
      ];
    } else {
      return [
        {
          type: 'medium',
          title: 'Nurture Campaign',
          description: 'Add to educational email sequence',
          icon: Mail,
          color: 'green'
        },
        {
          type: 'low',
          title: 'Monitor Activity',
          description: 'Track their engagement and revisit in 30 days',
          icon: TrendingUp,
          color: 'gray'
        }
      ];
    }
  };

  const recommendations = getRecommendations(lead.score);

  const handleSave = () => {
    onUpdate(editedLead);
    setEditing(false);
  };

  const handleStatusChange = (newStatus: Lead['status']) => {
    const updates = { status: newStatus };
    setEditedLead({ ...editedLead, ...updates });
    onUpdate(updates);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedLead.name}
                    onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={editedLead.position}
                    onChange={(e) => setEditedLead({ ...editedLead, position: e.target.value })}
                    className="text-lg text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
                  <p className="text-lg text-gray-600">{lead.position} at {lead.company}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <ScoreCircle score={lead.score} size="lg" />
              
              <div className="flex items-center space-x-2">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <div className="flex items-center space-x-2">
              {(['new', 'qualified', 'contacted', 'converted'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    lead.status === status
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-700">
                    {lead.email}
                  </a>
                </div>
                {lead.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:text-blue-700">
                      {lead.phone}
                    </a>
                  </div>
                )}
                {lead.linkedin && (
                  <div className="flex items-center text-sm">
                    <Linkedin className="w-4 h-4 mr-3 text-gray-400" />
                    <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-4 h-4 mr-3 text-gray-400" />
                  {lead.industry} • {lead.companySize} employees
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  {lead.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-3 text-gray-400" />
                  {lead.revenue} revenue
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  Source: {lead.source}
                </div>
              </div>
            </div>
          </div>

          {/* AI Alignment Scorecard */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Alignment Scorecard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alignmentFactors.map((factor) => (
                <div key={factor.key} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{factor.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{factor.weight}</span>
                      <span className={`text-sm font-bold ${
                        factor.value >= 80 ? 'text-green-600' : 
                        factor.value >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {factor.value}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        factor.value >= 80 ? 'bg-green-500' : 
                        factor.value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${factor.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Recommendations</h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`flex items-start p-4 bg-${rec.color}-50 rounded-lg border border-${rec.color}-200`}>
                  <div className={`p-2 bg-${rec.color}-100 rounded-lg mr-3`}>
                    <rec.icon className={`w-5 h-5 text-${rec.color}-600`} />
                  </div>
                  <div>
                    <h4 className={`font-medium text-${rec.color}-900`}>{rec.title}</h4>
                    <p className={`text-sm text-${rec.color}-700`}>{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {lead.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{lead.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};