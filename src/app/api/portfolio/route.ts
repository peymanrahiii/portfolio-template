import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { PortfolioData, ApiResponse } from '@/types/portfolio';

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

    // Save to Vercel KV
    await kv.set('portfolio', portfolioData);

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
    // Retrieve from Vercel KV
    const portfolioData = await kv.get('portfolio');
    
    if (portfolioData) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Portfolio data retrieved successfully',
          data: portfolioData as PortfolioData 
        } as ApiResponse,
        { status: 200 }
      );
    } else {
      // No data found
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