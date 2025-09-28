import { prisma } from '@/db/lib/prisma';
import { sendEmail } from '@/lib/send';
import { SendReminderTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('CRON job on Vercel started...');

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

    for (const user of users) {
      if (!user.email) continue;

      await sendEmail({
        toEmail: [user.email],
        subject: 'Reminder',
        template: SendReminderTemplate({
          displayName: `${user.firstName || ''} ${user.lastName || ''}`
        })
      });
      emails.push(user.email);
    }

    return NextResponse.json({
      message: '✅ Monthly emails sent to all users.',
      data: emails
    });
  } catch (error) {
    console.error('[CRON_ERROR]', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
