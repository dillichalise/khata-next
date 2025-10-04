import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_FROM_EMAIL } from '@/lib/config';
import logger from '@/lib/winston';

interface ISendEmail {
  toEmail: string[];
  subject: string;
  template: React.ReactNode;
}

export const sendEmail = async ({ toEmail, subject, template }: ISendEmail) => {
  try {
    const resend = new Resend(RESEND_API_KEY as string);
    const from = RESEND_FROM_EMAIL as string;

    return resend.emails
      .send({
        from: `Khata <${from}>`,
        to: toEmail,
        subject,
        react: template
      })
      .then((data) => {
        return data;
      });
  } catch (error) {
    logger.error(
      `[Error on sending Email to ${toEmail}] --> ${JSON.stringify(error)}`
    );
  }
};
