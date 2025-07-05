import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import { format } from 'date-fns';

interface SendOfferEmailTemplateProps {
  displayName: string;
}

export const SendReminderTemplate = async ({
  displayName
}: SendOfferEmailTemplateProps) => {
  const dueMonth = format(new Date(), 'MMMM');

  return (
    <Html>
      <Head />
      <Preview>Monthly Reminder</Preview>

      <Tailwind>
        <Body className='bg-gray-100 font-sans'>
          <Container className='mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md'>
            <Section className='text-[#525f7f]'>
              <Text className='mb-4 text-lg'>Hi {displayName},</Text>

              <Text className='text-base leading-6 font-normal'>
                This is a friendly reminder to deposit your monthly saving
                before {dueMonth} 5.
              </Text>

              <Text className='mb-2'>
                If you have any interest amount due, please check your dashboard
                and pay it along with your saving deposit.
              </Text>

              <Text className='mb-6'>
                If you’ve already completed your payments for this month, you
                can safely ignore this message. 😊
              </Text>

              <Text>
                Best regards,
                <br />
                Cooperative Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
