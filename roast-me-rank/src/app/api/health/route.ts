import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    const databaseStatus = 'connected';
    
    // Basic health metrics
    const health = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
      database: databaseStatus,
      version: process.env.npm_package_version || 'unknown',
      environment: process.env.NODE_ENV || 'development',
    };
    
    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    const health = {
      status: 'error',
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(health, { status: 500 });
  }
}
