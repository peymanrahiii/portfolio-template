import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { PortfolioData, ApiResponse } from '@/types/portfolio';

const DATA_DIR = path.join('/tmp');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Validate required fields
function validatePortfolioData(data: any): string | null {
  if (!data.personalInfo?.name) return 'Personal info name is required';
  if (!data.personalInfo?.title) return 'Personal info title is required';
  if (!Array.isArray(data.experience)) return 'Experience must be an array';
  if (!Array.isArray(data.education)) return 'Education must be an array';
  if (!Array.isArray(data.skills)) return 'Skills must be an array';
  if (!Array.isArray(data.projects)) return 'Projects must be an array';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the data structure
    const validationError = validatePortfolioData(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError } as ApiResponse,
        { status: 400 }
      );
    }

    // Add timestamp
    const portfolioData: PortfolioData = {
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    // Ensure data directory exists
    await ensureDataDir();

    // Save to JSON file
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Portfolio data updated successfully',
        data: portfolioData 
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update portfolio data' 
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDataDir();
    
    try {
      const fileContent = await fs.readFile(PORTFOLIO_FILE, 'utf-8');
      const portfolioData: PortfolioData = JSON.parse(fileContent);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Portfolio data retrieved successfully',
          data: portfolioData 
        } as ApiResponse,
        { status: 200 }
      );
    } catch (fileError) {
      // File doesn't exist yet
      return NextResponse.json(
        { 
          success: false, 
          error: 'No portfolio data found. Please submit data first.' 
        } as ApiResponse,
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Error retrieving portfolio:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve portfolio data' 
      } as ApiResponse,
      { status: 500 }
    );
  }
} 