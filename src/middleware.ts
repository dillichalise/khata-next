import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/auth/fallback(.*)'
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  try {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  } catch (error) {
    console.error('Middleware error:', error);
    return new Response('Middleware Error', { status: 500 });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
