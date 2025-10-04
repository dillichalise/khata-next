import { NextResponse } from 'next/server';
import { core } from '@/db/core';
import logger from '@/lib/winston';

export async function GET() {
  logger.info('🏥 Health check started.');

  try {
    const databaseStatus = await checkDatabase();
    const apiStatus = await checkExternalAPI();

    if (!databaseStatus || !apiStatus) {
      logger.warn('⚠️ Health check failed.');
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
    logger.error(`❌ Health check error --> ${JSON.stringify(error)}`);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}

async function checkDatabase(): Promise<boolean> {
  return core.healthCheck.getHealthCheck();
}

async function checkExternalAPI(): Promise<boolean> {
  return core.user.getUserCountHealth();
}
