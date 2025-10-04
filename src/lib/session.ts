import { cookies } from 'next/headers';
import { NODE_ENV } from './config';

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: NODE_ENV === 'production',
    expires: expiresAt,
    path: '/'
  });
}
