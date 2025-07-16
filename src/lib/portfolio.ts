import { PortfolioData, ApiResponse } from '@/types/portfolio';

export async function getPortfolioData(): Promise<PortfolioData | null> {
  try {
    const response = await fetch('/api/portfolio');
    const result: ApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
}

export function getExperienceDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  let duration = `${years} year${years !== 1 ? 's' : ''}`;
  if (months > 0) {
    duration += ` ${months} month${months !== 1 ? 's' : ''}`;
  }
  
  return duration;
} 