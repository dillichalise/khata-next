import { cookies } from 'next/headers';

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/'
  });
}
