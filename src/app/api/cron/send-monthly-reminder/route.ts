import { prisma } from '@/db/lib/prisma';
import { sendEmail } from '@/lib/send';
import { SendReminderTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
