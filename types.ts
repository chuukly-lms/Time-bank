export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  url?: string;
  tags: string[];
}

export interface ParsedOpportunity {
  name: string;
  role: string;
  description: string;
}

export interface SearchResult {
  text: string;
  parsedOpportunities: ParsedOpportunity[];
  sources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface TimeLog {
  id: string;
  opportunityTitle: string;
  organization: string;
  hours: number;
  date: string;
  hash: string; // Simulated blockchain hash
  previousHash: string;
  verified: boolean;
  status: 'pending' | 'verified';
}

export interface UserProfile {
  name: string;
  school: string;
  totalHours: number;
  logs: TimeLog[];
}