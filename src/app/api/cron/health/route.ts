import { NextResponse } from 'next/server';
import { core } from '@/db/core';

export async function GET() {
  console.log('🏥 Health check started at', new Date().toISOString());

  try {
    const databaseStatus = await checkDatabase();
    const apiStatus = await checkExternalAPI();

    if (!databaseStatus || !apiStatus) {
      console.warn('⚠️ Health check failed');
      return NextResponse.json({
        code: 503,
        status: 'fail',
        database: databaseStatus ? 'up' : 'down',
        api: apiStatus ? 'up' : 'down'
      });
    }

    return NextResponse.json({
      code: 200,
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Health check error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}

async function checkDatabase(): Promise<boolean> {
  return core.healthCheck.getHealthCheck();
}

async function checkExternalAPI(): Promise<boolean> {
  return core.user.getUserCountHealth();
}
