'use client';
import React, { useEffect, useRef } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({
  children,
  user
}: {
  children: React.ReactNode;
  user: any;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY! ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    // Only initialize PostHog once
    if (!initialized.current) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY! as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST! || 'https://eu.i.posthog.com',
        session_recording: {
          recordCrossOriginIframes: false
        }
      });
      initialized.current = true;
    }

    // Update user identification when user changes
    if (user) {
      posthog.identify(`${user?.firstName} ${user?.lastName}`);
    }
  }, [user]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
