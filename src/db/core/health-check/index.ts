import { db } from '@/db/lib';

export function getHealthCheck() {
  return db.checkDatabase();
}
