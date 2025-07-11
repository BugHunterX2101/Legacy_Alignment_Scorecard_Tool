import React from 'react';
import { TrendingUp, Users, Target, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalLeads: number;
    qualifiedLeads: number;
    averageScore: number;
    conversionRate: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Leads',
      value: stats.totalLeads.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-[#2563EB]',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Qualified Leads',
      value: stats.qualifiedLeads.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'text-[#22C55E]',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Average Score',
      value: `${stats.averageScore}/100`,
      change: '+3.1%',
      trend: 'up',
      icon: Award,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: '-2.4%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-[#6366F1]',
      bg: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-[#1E2328] rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400">{item.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
            </div>
            <div className={`${item.bg} ${item.color} p-3 rounded-lg border border-gray-600`}>
              <item.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${
              item.trend === 'up' ? 'text-[#22C55E]' : 'text-red-400'
            }`}>
              {item.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">{item.change}</span>
            </div>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};