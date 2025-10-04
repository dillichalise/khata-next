import { prisma } from '@/db/lib/prisma';
import { sendEmail } from '@/lib/send';
import { SendReminderTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import logger from '@/lib/winston';

export async function GET(request: Request) {
  logger.info('CRON job on Vercel started...');

  // Optional: Add security check (see below)
  const userAgent = request.headers.get('user-agent');
  if (userAgent !== 'vercel-cron/1.0') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      where: { status: 'ACTIVE' }
    });

    const emails: string[] = [];
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    for (const user of users) {
      if (!user.email) continue;

      await sendEmail({
        toEmail: [user.email],
        subject: 'Reminder',
        template: SendReminderTemplate({
          displayName: `${user.firstName || ''} ${user.lastName || ''}`
        })
      });

      logger.info(`Email sent to: ${user.email}`);
      emails.push(user.email);

      // Rate limit: 2 emails per second (500ms delay)
      await delay(500);
    }

    return NextResponse.json({
      message: '✅ Monthly emails sent to all users.',
      data: emails
    });
  } catch (error) {
    logger.error(`[CRON_ERROR] --> ${JSON.stringify(error)}`);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
