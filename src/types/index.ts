export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  industry: string;
  companySize: string;
  revenue: string;
  location: string;
  linkedin?: string;
  phone?: string;
  source: string;
  dateAdded: string;
  score: number;
  status: 'new' | 'qualified' | 'unqualified' | 'contacted' | 'converted';
  tags: string[];
  notes?: string;
  alignment: {
    industry: number;
    companySize: number;
    revenue: number;
    position: number;
    geography: number;
    engagement: number;
    overall: number;
  };
}

export interface ScoreFactors {
  industry: {
    weight: number;
    targetIndustries: string[];
  };
  companySize: {
    weight: number;
    targetSizes: string[];
  };
  revenue: {
    weight: number;
    targetRevenue: string[];
  };
  position: {
    weight: number;
    targetPositions: string[];
  };
  geography: {
    weight: number;
    targetLocations: string[];
  };
  engagement: {
    weight: number;
    factors: string[];
  };
}

export interface FilterOptions {
  scoreRange: [number, number];
  industries: string[];
  companySizes: string[];
  statuses: string[];
  sources: string[];
  dateRange: [string, string];
}

export interface DashboardStats {
  totalLeads: number;
  qualifiedLeads: number;
  averageScore: number;
  conversionRate: number;
  topIndustries: { name: string; count: number; avgScore: number }[];
  scoreDistribution: { range: string; count: number }[];
  monthlyTrends: { month: string; leads: number; avgScore: number }[];
}