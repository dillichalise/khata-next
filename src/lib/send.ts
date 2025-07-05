'use server';

import { Resend } from 'resend';

interface ISendEmail {
  toEmail: string[];
  subject: string;
  template: React.ReactNode;
}

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async ({ toEmail, subject, template }: ISendEmail) => {
  try {
    const from = process.env.RESEND_FROM_EMAIL as string;

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
    console.log('error on sending', error);
  }
};
