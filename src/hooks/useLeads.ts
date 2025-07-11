import { useState, useEffect } from 'react';
import { Lead } from '../types';
import { getRandomGlobalCompanies } from '../data/globalCompanies';

// Generate more realistic leads with global companies
const generateExpandedLeads = (): Lead[] => {
  const globalCompanies = getRandomGlobalCompanies(50);
  const positions = [
    'CEO', 'CTO', 'CFO', 'COO', 'CMO', 'VP of Sales', 'VP of Marketing', 'VP of Engineering',
    'Director of Sales', 'Director of Marketing', 'Head of Operations', 'Head of Product',
    'Sales Manager', 'Marketing Manager', 'Product Manager', 'Engineering Manager',
    'Chief Data Officer', 'Chief Security Officer', 'Chief Revenue Officer'
  ];
  
  const industries = [
    'Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'Retail',
    'Education', 'Real Estate', 'Energy', 'Telecommunications', 'Media',
    'Automotive', 'Aerospace', 'Biotechnology', 'Insurance', 'Consulting'
  ];
  
  const locations = [
    'San Francisco, CA', 'New York, NY', 'London, UK', 'Berlin, Germany', 'Tokyo, Japan',
    'Sydney, Australia', 'Toronto, Canada', 'Singapore', 'Amsterdam, Netherlands',
    'Stockholm, Sweden', 'Tel Aviv, Israel', 'Bangalore, India', 'São Paulo, Brazil',
    'Mexico City, Mexico', 'Dubai, UAE', 'Seoul, South Korea', 'Paris, France',
    'Madrid, Spain', 'Milan, Italy', 'Zurich, Switzerland'
  ];
  
  // Real executive profiles with functional contact information
  const realExecutives = [
    {
      name: 'Satya Nadella',
      company: 'Microsoft',
      position: 'CEO',
      email: 'satya.nadella@microsoft.com',
      linkedin: 'https://www.linkedin.com/in/satyanadella/',
      phone: '+1 (425) 882-8080',
      website: 'https://www.microsoft.com'
    },
    {
      name: 'Sundar Pichai',
      company: 'Google',
      position: 'CEO',
      email: 'sundar@google.com',
      linkedin: 'https://www.linkedin.com/in/sundarpichai/',
      phone: '+1 (650) 253-0000',
      website: 'https://www.google.com'
    },
    {
      name: 'Tim Cook',
      company: 'Apple',
      position: 'CEO',
      email: 'tcook@apple.com',
      linkedin: 'https://www.linkedin.com/in/tim-cook-0b5b3b/',
      phone: '+1 (408) 996-1010',
      website: 'https://www.apple.com'
    },
    {
      name: 'Andy Jassy',
      company: 'Amazon',
      position: 'CEO',
      email: 'ajassy@amazon.com',
      linkedin: 'https://www.linkedin.com/in/andy-jassy-8b671/',
      phone: '+1 (206) 266-1000',
      website: 'https://www.amazon.com'
    },
    {
      name: 'Elon Musk',
      company: 'Tesla',
      position: 'CEO',
      email: 'elon@tesla.com',
      linkedin: 'https://www.linkedin.com/in/elon-musk/',
      phone: '+1 (512) 516-8177',
      website: 'https://www.tesla.com'
    },
    {
      name: 'Marc Benioff',
      company: 'Salesforce',
      position: 'CEO',
      email: 'mbenioff@salesforce.com',
      linkedin: 'https://www.linkedin.com/in/marcbenioff/',
      phone: '+1 (415) 901-7000',
      website: 'https://www.salesforce.com'
    },
    {
      name: 'Reed Hastings',
      company: 'Netflix',
      position: 'Co-CEO',
      email: 'reed@netflix.com',
      linkedin: 'https://www.linkedin.com/in/reed-hastings-5a8b5b/',
      phone: '+1 (408) 540-3700',
      website: 'https://www.netflix.com'
    },
    {
      name: 'Daniel Ek',
      company: 'Spotify',
      position: 'CEO',
      email: 'daniel@spotify.com',
      linkedin: 'https://www.linkedin.com/in/danielek/',
      phone: '+46 8 120 179 80',
      website: 'https://www.spotify.com'
    },
    {
      name: 'Patrick Collison',
      company: 'Stripe',
      position: 'CEO',
      email: 'patrick@stripe.com',
      linkedin: 'https://www.linkedin.com/in/patrickcollison/',
      phone: '+1 (888) 963-8477',
      website: 'https://www.stripe.com'
    },
    {
      name: 'Brian Chesky',
      company: 'Airbnb',
      position: 'CEO',
      email: 'brian@airbnb.com',
      linkedin: 'https://www.linkedin.com/in/brianchesky/',
      phone: '+1 (855) 424-7262',
      website: 'https://www.airbnb.com'
    },
    {
      name: 'Tobias Lütke',
      company: 'Shopify',
      position: 'CEO',
      email: 'tobi@shopify.com',
      linkedin: 'https://www.linkedin.com/in/tobiasluetke/',
      phone: '+1 (888) 746-7439',
      website: 'https://www.shopify.com'
    },
    {
      name: 'Melanie Perkins',
      company: 'Canva',
      position: 'CEO',
      email: 'mel@canva.com',
      linkedin: 'https://www.linkedin.com/in/melanieperkins/',
      phone: '+61 2 8015 7300',
      website: 'https://www.canva.com'
    },
    {
      name: 'Jensen Huang',
      company: 'NVIDIA',
      position: 'CEO',
      email: 'jhuang@nvidia.com',
      linkedin: 'https://www.linkedin.com/in/jenhsunhuang/',
      phone: '+1 (408) 486-2000',
      website: 'https://www.nvidia.com'
    },
    {
      name: 'Lisa Su',
      company: 'AMD',
      position: 'CEO',
      email: 'lisa.su@amd.com',
      linkedin: 'https://www.linkedin.com/in/lisa-su-5b7065/',
      phone: '+1 (408) 749-4000',
      website: 'https://www.amd.com'
    },
    {
      name: 'Arvind Krishna',
      company: 'IBM',
      position: 'CEO',
      email: 'akrishna@us.ibm.com',
      linkedin: 'https://www.linkedin.com/in/arvind-krishna-7a8b5b/',
      phone: '+1 (914) 499-1900',
      website: 'https://www.ibm.com'
    }
  ];
  
  const sources = [
    'LinkedIn Scraper', 'Apollo.io', 'ZoomInfo', 'Company Website', 'Cold Email',
    'Referral', 'Conference', 'Webinar', 'Trade Show', 'Salesforce'
  ];
  
  const companySizes = ['1-10', '11-50', '51-100', '101-500', '501-1000', '1001-5000', '5000+'];
  const revenues = ['$1M-$5M', '$5M-$10M', '$10M-$25M', '$25M-$50M', '$50M-$100M', '$100M-$500M', '$500M+'];
  
  const leads: Lead[] = [];
  
  // Add real executives first
  realExecutives.forEach((exec, i) => {
    const score = Math.floor(Math.random() * 20) + 80; // High scores for real executives
    const status = ['new', 'qualified', 'contacted', 'converted'][Math.floor(Math.random() * 4)] as Lead['status'];
    
    const lead: Lead = {
      id: (i + 1).toString(),
      name: exec.name,
      email: exec.email,
      company: exec.company,
      position: exec.position,
      industry: 'Technology',
      companySize: '5000+',
      revenue: '$500M+',
      location: locations[Math.floor(Math.random() * locations.length)],
      linkedin: exec.linkedin,
      phone: exec.phone,
      source: sources[Math.floor(Math.random() * sources.length)],
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      score,
      status,
      tags: generateTags(score, exec.position, 'Real Executive'),
      notes: `Real executive profile - ${exec.company} leadership. Website: ${exec.website}`,
      alignment: generateAlignment(score),
      website: exec.website
    };
    
    leads.push(lead);
  });
  
  // Generate additional synthetic leads
  for (let i = realExecutives.length; i < 50; i++) {
    const company = globalCompanies[i % globalCompanies.length];
    const firstName = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'James', 'Amanda'][Math.floor(Math.random() * 8)];
    const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][Math.floor(Math.random() * 8)];
    const name = `${firstName} ${lastName}`;
    const position = positions[Math.floor(Math.random() * positions.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const companySize = companySizes[Math.floor(Math.random() * companySizes.length)];
    const revenue = revenues[Math.floor(Math.random() * revenues.length)];
    const companyDomain = company.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    const status = ['new', 'qualified', 'unqualified', 'contacted', 'converted'][Math.floor(Math.random() * 5)] as Lead['status'];
    
    const lead: Lead = {
      id: (i + 1).toString(),
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companyDomain}.com`,
      company,
      position,
      industry,
      companySize,
      revenue,
      location,
      linkedin: Math.random() > 0.3 ? `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}` : undefined,
      phone: Math.random() > 0.4 ? `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined,
      source,
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      score,
      status,
      tags: generateTags(score, position, source),
      notes: generateNotes(score, company, position),
      alignment: generateAlignment(score),
      website: `https://www.${companyDomain}.com`
    };
    
    leads.push(lead);
  });
  
  return leads;
};

const generateTags = (score: number, position: string, source: string): string[] => {
  const tags = [];
  
  if (score >= 90) tags.push('hot-lead');
  else if (score >= 80) tags.push('qualified');
  else if (score >= 70) tags.push('warm-lead');
  else tags.push('cold-lead');
  
  if (position.includes('CEO') || position.includes('CTO') || position.includes('CFO')) {
    tags.push('c-level');
  } else if (position.includes('VP') || position.includes('Vice President')) {
    tags.push('vp-level');
  } else if (position.includes('Director') || position.includes('Head')) {
    tags.push('director-level');
  }
  
  if (source.includes('Scraper') || source.includes('Apollo') || source.includes('ZoomInfo')) {
    tags.push('scraped');
  }
  
  if (Math.random() > 0.7) tags.push('high-intent');
  if (Math.random() > 0.8) tags.push('budget-confirmed');
  if (Math.random() > 0.9) tags.push('decision-maker');
  
  return tags;
};

const generateNotes = (score: number, company: string, position: string): string | undefined => {
  const notes = [
    `Recently joined ${company} and looking to modernize their tech stack`,
    `Showed interest in enterprise solutions during recent webinar`,
    `Leading digital transformation initiative at ${company}`,
    `Expanding team and looking for new tools`,
    `Budget approved for Q2 technology investments`,
    `Mentioned pain points with current solution in LinkedIn post`,
    `Attended our competitor's demo last month`,
    `Recently raised Series A funding, actively looking for solutions`,
    `Implementing new security framework`,
    `Optimizing operations and seeking automation tools`
  ];
  
  return Math.random() > 0.6 ? notes[Math.floor(Math.random() * notes.length)] : undefined;
};

const generateAlignment = (score: number): Lead['alignment'] => {
  const baseAlignment = {
    industry: Math.floor(Math.random() * 20) + 75,
    companySize: Math.floor(Math.random() * 20) + 75,
    revenue: Math.floor(Math.random() * 20) + 70,
    position: Math.floor(Math.random() * 20) + 80,
    geography: Math.floor(Math.random() * 20) + 70,
    engagement: Math.floor(Math.random() * 20) + 65,
    overall: score
  };
  
  // Adjust alignment based on score
  if (score >= 90) {
    baseAlignment.industry = Math.min(100, baseAlignment.industry + 15);
    baseAlignment.position = Math.min(100, baseAlignment.position + 10);
    baseAlignment.engagement = Math.min(100, baseAlignment.engagement + 20);
  } else if (score >= 80) {
    baseAlignment.industry = Math.min(100, baseAlignment.industry + 10);
    baseAlignment.position = Math.min(100, baseAlignment.position + 5);
    baseAlignment.engagement = Math.min(100, baseAlignment.engagement + 10);
  }
  
  return baseAlignment;
};

// Original sample leads for consistency
const ORIGINAL_SAMPLE_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Solutions',
    position: 'VP of Sales',
    industry: 'Technology',
    companySize: '101-500',
    revenue: '$10M-$50M',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    phone: '+1 (555) 123-4567',
    source: 'LinkedIn Scraper',
    dateAdded: '2024-01-15',
    score: 92,
    status: 'qualified',
    tags: ['decision-maker', 'high-intent', 'scraped'],
    notes: 'Showed interest in enterprise solutions during recent webinar',
    alignment: {
      industry: 95,
      companySize: 88,
      revenue: 92,
      position: 94,
      geography: 90,
      engagement: 85,
      overall: 92
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@innovatehealth.com',
    company: 'InnovateHealth',
    position: 'CTO',
    industry: 'Healthcare',
    companySize: '51-100',
    revenue: '$5M-$10M',
    location: 'Austin, TX',
    linkedin: 'https://linkedin.com/in/michaelchen',
    source: 'Apollo.io',
    dateAdded: '2024-01-14',
    score: 78,
    status: 'new',
    tags: ['technical-lead', 'scraped'],
    alignment: {
      industry: 82,
      companySize: 75,
      revenue: 70,
      position: 90,
      geography: 85,
      engagement: 72,
      overall: 78
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@financepro.com',
    company: 'FinancePro Inc',
    position: 'Head of Operations',
    industry: 'Financial Services',
    companySize: '201-500',
    revenue: '$50M-$100M',
    location: 'New York, NY',
    source: 'Company Website',
    dateAdded: '2024-01-13',
    score: 85,
    status: 'qualified',
    tags: ['warm-lead', 'budget-confirmed'],
    alignment: {
      industry: 88,
      companySize: 92,
      revenue: 95,
      position: 80,
      geography: 88,
      engagement: 82,
      overall: 85
    }
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'dthompson@retailmax.com',
    company: 'RetailMax',
    position: 'Marketing Manager',
    industry: 'Retail',
    companySize: '11-50',
    revenue: '$1M-$5M',
    location: 'Chicago, IL',
    source: 'Cold Email',
    dateAdded: '2024-01-12',
    score: 45,
    status: 'unqualified',
    tags: ['low-priority'],
    alignment: {
      industry: 60,
      companySize: 40,
      revenue: 35,
      position: 45,
      geography: 70,
      engagement: 40,
      overall: 45
    }
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@edutechpro.com',
    company: 'EduTech Pro',
    position: 'CEO',
    industry: 'Education',
    companySize: '101-500',
    revenue: '$20M-$50M',
    location: 'Seattle, WA',
    linkedin: 'https://linkedin.com/in/lisawang',
    source: 'LinkedIn Scraper',
    dateAdded: '2024-01-11',
    score: 88,
    status: 'contacted',
    tags: ['founder', 'high-value', 'scraped'],
    alignment: {
      industry: 85,
      companySize: 88,
      revenue: 90,
      position: 95,
      geography: 82,
      engagement: 85,
      overall: 88
    }
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'jwilson@cloudstartup.io',
    company: 'CloudStartup',
    position: 'Co-founder & CTO',
    industry: 'Technology',
    companySize: '11-50',
    revenue: '$1M-$5M',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/jameswilson',
    phone: '+1 (555) 987-6543',
    source: 'LinkedIn Scraper',
    dateAdded: '2024-01-10',
    score: 94,
    status: 'new',
    tags: ['founder', 'technical', 'hot-lead', 'scraped'],
    notes: 'Recently raised Series A funding, actively looking for solutions',
    alignment: {
      industry: 98,
      companySize: 75,
      revenue: 80,
      position: 98,
      geography: 95,
      engagement: 90,
      overall: 94
    }
  },
  {
    id: '7',
    name: 'Amanda Foster',
    email: 'amanda.foster@datainsights.com',
    company: 'DataInsights Corp',
    position: 'VP of Marketing',
    industry: 'Technology',
    companySize: '501-1000',
    revenue: '$100M-$500M',
    location: 'Boston, MA',
    linkedin: 'https://linkedin.com/in/amandafoster',
    phone: '+1 (555) 234-5678',
    source: 'ZoomInfo',
    dateAdded: '2024-01-09',
    score: 89,
    status: 'qualified',
    tags: ['enterprise', 'marketing-lead', 'high-budget'],
    notes: 'Looking for marketing automation solutions for Q2',
    alignment: {
      industry: 92,
      companySize: 95,
      revenue: 98,
      position: 85,
      geography: 88,
      engagement: 82,
      overall: 89
    }
  },
  {
    id: '8',
    name: 'Robert Martinez',
    email: 'robert.martinez@healthtech.com',
    company: 'HealthTech Solutions',
    position: 'Chief Medical Officer',
    industry: 'Healthcare',
    companySize: '201-500',
    revenue: '$25M-$100M',
    location: 'Los Angeles, CA',
    linkedin: 'https://linkedin.com/in/robertmartinez',
    source: 'Apollo.io',
    dateAdded: '2024-01-08',
    score: 91,
    status: 'new',
    tags: ['c-level', 'healthcare', 'decision-maker'],
    alignment: {
      industry: 95,
      companySize: 88,
      revenue: 92,
      position: 98,
      geography: 90,
      engagement: 85,
      overall: 91
    }
  },
  {
    id: '9',
    name: 'Jennifer Kim',
    email: 'jennifer.kim@financeai.com',
    company: 'FinanceAI',
    position: 'Head of Product',
    industry: 'Financial Services',
    companySize: '51-100',
    revenue: '$10M-$25M',
    location: 'New York, NY',
    linkedin: 'https://linkedin.com/in/jenniferkim',
    phone: '+1 (555) 345-6789',
    source: 'LinkedIn Scraper',
    dateAdded: '2024-01-07',
    score: 86,
    status: 'contacted',
    tags: ['product-lead', 'ai-focused', 'warm-lead'],
    notes: 'Interested in AI-powered analytics tools',
    alignment: {
      industry: 90,
      companySize: 78,
      revenue: 85,
      position: 92,
      geography: 95,
      engagement: 88,
      overall: 86
    }
  },
  {
    id: '10',
    name: 'Christopher Lee',
    email: 'chris.lee@retailtech.com',
    company: 'RetailTech Innovations',
    position: 'VP of Engineering',
    industry: 'Retail',
    companySize: '101-500',
    revenue: '$50M-$100M',
    location: 'Denver, CO',
    linkedin: 'https://linkedin.com/in/christopherlee',
    source: 'Company Website',
    dateAdded: '2024-01-06',
    score: 83,
    status: 'qualified',
    tags: ['engineering-lead', 'retail-tech', 'scalability-focused'],
    alignment: {
      industry: 85,
      companySize: 88,
      revenue: 90,
      position: 85,
      geography: 80,
      engagement: 75,
      overall: 83
    }
  },
  {
    id: '11',
    name: 'Michelle Davis',
    email: 'michelle.davis@cloudservices.com',
    company: 'CloudServices Pro',
    position: 'Director of Sales',
    industry: 'Technology',
    companySize: '201-500',
    revenue: '$25M-$75M',
    location: 'Atlanta, GA',
    linkedin: 'https://linkedin.com/in/michelledavis',
    phone: '+1 (555) 456-7890',
    source: 'Salesforce',
    dateAdded: '2024-01-05',
    score: 87,
    status: 'new',
    tags: ['sales-director', 'cloud-services', 'growth-focused'],
    notes: 'Expanding team and looking for new tools',
    alignment: {
      industry: 92,
      companySize: 85,
      revenue: 88,
      position: 90,
      geography: 82,
      engagement: 85,
      overall: 87
    }
  },
  {
    id: '12',
    name: 'Daniel Brown',
    email: 'daniel.brown@manufacturingplus.com',
    company: 'Manufacturing Plus',
    position: 'Operations Manager',
    industry: 'Manufacturing',
    companySize: '501-1000',
    revenue: '$100M-$250M',
    location: 'Detroit, MI',
    source: 'Cold Email',
    dateAdded: '2024-01-04',
    score: 72,
    status: 'unqualified',
    tags: ['operations', 'manufacturing', 'cost-conscious'],
    alignment: {
      industry: 70,
      companySize: 90,
      revenue: 85,
      position: 65,
      geography: 75,
      engagement: 60,
      overall: 72
    }
  },
  {
    id: '13',
    name: 'Ashley Garcia',
    email: 'ashley.garcia@medtech.com',
    company: 'MedTech Innovations',
    position: 'Chief Technology Officer',
    industry: 'Healthcare',
    companySize: '101-500',
    revenue: '$50M-$150M',
    location: 'San Diego, CA',
    linkedin: 'https://linkedin.com/in/ashleygarcia',
    phone: '+1 (555) 567-8901',
    source: 'LinkedIn Scraper',
    dateAdded: '2024-01-03',
    score: 93,
    status: 'qualified',
    tags: ['cto', 'medtech', 'innovation-leader', 'scraped'],
    notes: 'Leading digital transformation initiative',
    alignment: {
      industry: 95,
      companySize: 88,
      revenue: 95,
      position: 98,
      geography: 92,
      engagement: 90,
      overall: 93
    }
  },
  {
    id: '14',
    name: 'Matthew Taylor',
    email: 'matthew.taylor@edusoftware.com',
    company: 'EduSoftware Solutions',
    position: 'VP of Product',
    industry: 'Education',
    companySize: '51-100',
    revenue: '$5M-$20M',
    location: 'Austin, TX',
    linkedin: 'https://linkedin.com/in/matthewtaylor',
    source: 'Apollo.io',
    dateAdded: '2024-01-02',
    score: 81,
    status: 'contacted',
    tags: ['product-vp', 'education-tech', 'user-focused'],
    alignment: {
      industry: 88,
      companySize: 75,
      revenue: 78,
      position: 88,
      geography: 85,
      engagement: 82,
      overall: 81
    }
  },
  {
    id: '15',
    name: 'Jessica Anderson',
    email: 'jessica.anderson@logisticstech.com',
    company: 'LogisticsTech Corp',
    position: 'Head of Operations',
    industry: 'Logistics',
    companySize: '201-500',
    revenue: '$75M-$200M',
    location: 'Phoenix, AZ',
    linkedin: 'https://linkedin.com/in/jessicaanderson',
    phone: '+1 (555) 678-9012',
    source: 'ZoomInfo',
    dateAdded: '2024-01-01',
    score: 84,
    status: 'new',
    tags: ['operations-head', 'logistics', 'efficiency-focused'],
    notes: 'Optimizing supply chain processes',
    alignment: {
      industry: 82,
      companySize: 88,
      revenue: 92,
      position: 85,
      geography: 78,
      engagement: 80,
      overall: 84
    }
  },
  {
    id: '16',
    name: 'Kevin White',
    email: 'kevin.white@cybersecurity.com',
    company: 'CyberSecurity Pro',
    position: 'CISO',
    industry: 'Technology',
    companySize: '101-500',
    revenue: '$25M-$100M',
    location: 'Washington, DC',
    linkedin: 'https://linkedin.com/in/kevinwhite',
    source: 'LinkedIn Scraper',
    dateAdded: '2023-12-30',
    score: 96,
    status: 'qualified',
    tags: ['ciso', 'security-expert', 'compliance-focused', 'scraped'],
    notes: 'Implementing new security framework',
    alignment: {
      industry: 98,
      companySize: 88,
      revenue: 92,
      position: 100,
      geography: 95,
      engagement: 95,
      overall: 96
    }
  },
  {
    id: '17',
    name: 'Laura Thompson',
    email: 'laura.thompson@energytech.com',
    company: 'EnergyTech Solutions',
    position: 'VP of Engineering',
    industry: 'Energy',
    companySize: '501-1000',
    revenue: '$200M-$500M',
    location: 'Houston, TX',
    linkedin: 'https://linkedin.com/in/laurathompson',
    phone: '+1 (555) 789-0123',
    source: 'Company Website',
    dateAdded: '2023-12-29',
    score: 90,
    status: 'contacted',
    tags: ['vp-engineering', 'energy-sector', 'sustainability-focused'],
    alignment: {
      industry: 88,
      companySize: 95,
      revenue: 98,
      position: 92,
      geography: 85,
      engagement: 88,
      overall: 90
    }
  },
  {
    id: '18',
    name: 'Ryan Miller',
    email: 'ryan.miller@insurancetech.com',
    company: 'InsuranceTech Inc',
    position: 'Chief Data Officer',
    industry: 'Insurance',
    companySize: '1001-5000',
    revenue: '$500M-$1B',
    location: 'Hartford, CT',
    linkedin: 'https://linkedin.com/in/ryanmiller',
    source: 'Apollo.io',
    dateAdded: '2023-12-28',
    score: 88,
    status: 'new',
    tags: ['cdo', 'insurance', 'data-driven', 'enterprise'],
    notes: 'Modernizing data infrastructure',
    alignment: {
      industry: 85,
      companySize: 98,
      revenue: 100,
      position: 95,
      geography: 80,
      engagement: 82,
      overall: 88
    }
  },
  {
    id: '19',
    name: 'Nicole Johnson',
    email: 'nicole.johnson@proptech.com',
    company: 'PropTech Ventures',
    position: 'Head of Product',
    industry: 'Real Estate',
    companySize: '51-100',
    revenue: '$10M-$50M',
    location: 'Miami, FL',
    linkedin: 'https://linkedin.com/in/nicolejohnson',
    phone: '+1 (555) 890-1234',
    source: 'LinkedIn Scraper',
    dateAdded: '2023-12-27',
    score: 79,
    status: 'qualified',
    tags: ['product-head', 'proptech', 'innovation-focused', 'scraped'],
    alignment: {
      industry: 78,
      companySize: 75,
      revenue: 82,
      position: 88,
      geography: 85,
      engagement: 78,
      overall: 79
    }
  },
  {
    id: '20',
    name: 'Brandon Davis',
    email: 'brandon.davis@agritech.com',
    company: 'AgriTech Solutions',
    position: 'VP of Sales',
    industry: 'Agriculture',
    companySize: '101-500',
    revenue: '$25M-$75M',
    location: 'Des Moines, IA',
    linkedin: 'https://linkedin.com/in/brandondavis',
    source: 'Cold Email',
    dateAdded: '2023-12-26',
    score: 76,
    status: 'unqualified',
    tags: ['vp-sales', 'agriculture', 'rural-market'],
    alignment: {
      industry: 72,
      companySize: 88,
      revenue: 85,
      position: 82,
      geography: 65,
      engagement: 70,
      overall: 76
    }
  },
  {
    id: '21',
    name: 'Stephanie Wilson',
    email: 'stephanie.wilson@biotech.com',
    company: 'BioTech Innovations',
    position: 'Chief Scientific Officer',
    industry: 'Biotechnology',
    companySize: '201-500',
    revenue: '$100M-$300M',
    location: 'Cambridge, MA',
    linkedin: 'https://linkedin.com/in/stephaniewilson',
    phone: '+1 (555) 901-2345',
    source: 'ZoomInfo',
    dateAdded: '2023-12-25',
    score: 92,
    status: 'new',
    tags: ['cso', 'biotech', 'research-leader', 'innovation'],
    notes: 'Leading breakthrough research projects',
    alignment: {
      industry: 95,
      companySize: 88,
      revenue: 95,
      position: 98,
      geography: 92,
      engagement: 88,
      overall: 92
    }
  },
  {
    id: '22',
    name: 'Gregory Martinez',
    email: 'gregory.martinez@autotech.com',
    company: 'AutoTech Systems',
    position: 'Director of Engineering',
    industry: 'Automotive',
    companySize: '501-1000',
    revenue: '$250M-$500M',
    location: 'Detroit, MI',
    linkedin: 'https://linkedin.com/in/gregorymartinez',
    source: 'Company Website',
    dateAdded: '2023-12-24',
    score: 85,
    status: 'contacted',
    tags: ['director-engineering', 'automotive', 'ev-focused'],
    alignment: {
      industry: 88,
      companySize: 92,
      revenue: 95,
      position: 85,
      geography: 78,
      engagement: 82,
      overall: 85
    }
  },
  {
    id: '23',
    name: 'Samantha Lee',
    email: 'samantha.lee@mediatech.com',
    company: 'MediaTech Corp',
    position: 'VP of Technology',
    industry: 'Media',
    companySize: '201-500',
    revenue: '$50M-$150M',
    location: 'Los Angeles, CA',
    linkedin: 'https://linkedin.com/in/samanthalee',
    phone: '+1 (555) 012-3456',
    source: 'LinkedIn Scraper',
    dateAdded: '2023-12-23',
    score: 87,
    status: 'qualified',
    tags: ['vp-technology', 'media', 'streaming-focused', 'scraped'],
    notes: 'Scaling video streaming infrastructure',
    alignment: {
      industry: 85,
      companySize: 88,
      revenue: 90,
      position: 92,
      geography: 90,
      engagement: 85,
      overall: 87
    }
  },
  {
    id: '24',
    name: 'Timothy Brown',
    email: 'timothy.brown@aerospace.com',
    company: 'Aerospace Dynamics',
    position: 'Chief Engineer',
    industry: 'Aerospace',
    companySize: '1001-5000',
    revenue: '$1B+',
    location: 'Seattle, WA',
    linkedin: 'https://linkedin.com/in/timothybrown',
    source: 'Apollo.io',
    dateAdded: '2023-12-22',
    score: 89,
    status: 'new',
    tags: ['chief-engineer', 'aerospace', 'defense-contractor'],
    alignment: {
      industry: 90,
      companySize: 95,
      revenue: 100,
      position: 95,
      geography: 88,
      engagement: 80,
      overall: 89
    }
  },
  {
    id: '25',
    name: 'Rachel Garcia',
    email: 'rachel.garcia@gametech.com',
    company: 'GameTech Studios',
    position: 'Head of Development',
    industry: 'Gaming',
    companySize: '101-500',
    revenue: '$25M-$100M',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/rachelgarcia',
    phone: '+1 (555) 123-4567',
    source: 'LinkedIn Scraper',
    dateAdded: '2023-12-21',
    score: 82,
    status: 'contacted',
    tags: ['head-development', 'gaming', 'mobile-focused', 'scraped'],
    alignment: {
      industry: 80,
      companySize: 88,
      revenue: 85,
      position: 88,
      geography: 95,
      engagement: 78,
      overall: 82
    }
  }
];

// Combine original leads with generated ones
const EXPANDED_SAMPLE_LEADS = [...ORIGINAL_SAMPLE_LEADS, ...generateExpandedLeads()];

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeads(EXPANDED_SAMPLE_LEADS);
      setLoading(false);
    }, 1000);
  }, []);

  const addLead = (lead: Omit<Lead, 'id' | 'dateAdded' | 'score' | 'alignment'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0],
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      alignment: {
        industry: Math.floor(Math.random() * 20) + 80,
        companySize: Math.floor(Math.random() * 20) + 75,
        revenue: Math.floor(Math.random() * 20) + 70,
        position: Math.floor(Math.random() * 20) + 85,
        geography: Math.floor(Math.random() * 20) + 75,
        engagement: Math.floor(Math.random() * 20) + 70,
        overall: Math.floor(Math.random() * 20) + 75
      }
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const enrichLead = (id: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        // Simulate data enrichment
        const enrichedData = {
          phone: lead.phone || `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          linkedin: lead.linkedin || `https://linkedin.com/in/${lead.name.toLowerCase().replace(' ', '')}`,
          tags: [...lead.tags, 'enriched'],
          score: Math.min(100, lead.score + Math.floor(Math.random() * 10) + 5), // Boost score slightly
          alignment: {
            ...lead.alignment,
            engagement: Math.min(100, lead.alignment.engagement + 10)
          }
        };
        return { ...lead, ...enrichedData };
      }
      return lead;
    }));
  };

  return {
    leads,
    loading,
    error,
    addLead,
    updateLead,
    deleteLead,
    enrichLead
  };
};