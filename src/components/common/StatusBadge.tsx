import React from 'react';

interface StatusBadgeProps {
  status: 'new' | 'qualified' | 'unqualified' | 'contacted' | 'converted';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  const statusConfig = {
    new: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'New'
    },
    qualified: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Qualified'
    },
    unqualified: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Unqualified'
    },
    contacted: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Contacted'
    },
    converted: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      label: 'Converted'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};