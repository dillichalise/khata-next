import { db } from '@/db/lib';
import { differenceInDays } from 'date-fns';

async function calculateInterest(principalAmount: number, days: number) {
  return (principalAmount * days * 0.1) / 365;
}
export function getUserTransactionSummary() {
  return db.summary.getUserTransactionSummary();
}

export function getTransactionSummary() {
  return db.summary.getTransactionSummaryFromUserSummary();
}
export async function getUserSummary(userId: number) {
  const user = await db.users.getUserById(userId);

  const today = new Date();

  const latestInterestPaidData =
    await db.summary.getLatestInterestPaidData(userId);

  let interestToPay = 0.0;
  let remainingLoan = Number(latestInterestPaidData?.remainingLoan);

  if (latestInterestPaidData) {
    const transactionsAfterLatestInterestPaid =
      await db.summary.getTransactionsAfterLatestInterestPaid(
        userId,
        latestInterestPaidData.transactionDate
      );

    if (transactionsAfterLatestInterestPaid.length === 1) {
      const principal = Number(
        transactionsAfterLatestInterestPaid[0].remainingLoan
      );
      interestToPay =
        interestToPay +
        (await calculateInterest(
          principal,
          differenceInDays(
            today,
            new Date(transactionsAfterLatestInterestPaid[0].transactionDate)
          )
        ));
      remainingLoan = principal;
    } else if (transactionsAfterLatestInterestPaid.length === 2) {
      const principal1 = Number(
        transactionsAfterLatestInterestPaid[0].remainingLoan
      );

      const principal2 = Number(
        transactionsAfterLatestInterestPaid[1].remainingLoan
      );
      remainingLoan = principal2;

      interestToPay =
        interestToPay +
        (await calculateInterest(
          principal1,
          differenceInDays(
            new Date(transactionsAfterLatestInterestPaid[1].transactionDate),
            new Date(transactionsAfterLatestInterestPaid[0].transactionDate)
          )
        )) +
        (await calculateInterest(
          principal2,
          differenceInDays(
            today,
            new Date(transactionsAfterLatestInterestPaid[1].transactionDate)
          )
        ));
    } else {
      for (let i = 0; i < transactionsAfterLatestInterestPaid.length - 1; i++) {
        const principalAmount = Number(
          transactionsAfterLatestInterestPaid[i].remainingLoan
        );

        const days = differenceInDays(
          new Date(transactionsAfterLatestInterestPaid[i + 1].transactionDate),
          new Date(transactionsAfterLatestInterestPaid[i].transactionDate)
        );

        interestToPay =
          interestToPay + (await calculateInterest(principalAmount, days));
      }

      interestToPay =
        interestToPay +
        (await calculateInterest(
          Number(
            transactionsAfterLatestInterestPaid[
              transactionsAfterLatestInterestPaid.length - 1
            ].remainingLoan
          ),
          differenceInDays(
            today,
            new Date(
              transactionsAfterLatestInterestPaid[
                transactionsAfterLatestInterestPaid.length - 1
              ].transactionDate
            )
          )
        ));

      remainingLoan = Number(
        transactionsAfterLatestInterestPaid[
          transactionsAfterLatestInterestPaid.length - 1
        ].remainingLoan
      );
    }
  } else {
    const latestHistory = await db.summary.getLatestUserHistory(userId);
    if (!latestHistory || latestHistory.remainingLoan === null) {
      remainingLoan = 0.0;
      interestToPay = 0.0;
    }
  }

  return {
    remainingLoan: remainingLoan,
    totalInterest: interestToPay,
    name: `${user?.firstName} ${user?.lastName}`
  };
}
