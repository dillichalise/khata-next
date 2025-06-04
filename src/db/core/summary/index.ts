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
  let remainingLoan: number;

  if (!latestInterestPaidData) {
    // Calculate data from only loan and loan return
    remainingLoan = 0;
    const userHistories = await db.summary.getUserHistories(userId);
    if (userHistories.length === 0) {
      remainingLoan = 0;
    } else {
      const principleAmt = Number(
        userHistories[userHistories.length - 1].remainingLoan
      );
      const tDate = new Date(
        userHistories[userHistories.length - 1].transactionDate
      );

      for (let i = 0; i < userHistories.length - 1; i++) {
        if (userHistories.length === 1) return;
        const pAmount = Number(userHistories[i].remainingLoan);
        const days = differenceInDays(
          new Date(userHistories[i + 1].transactionDate),
          new Date(userHistories[i].transactionDate)
        );
        interestToPay =
          interestToPay + (await calculateInterest(pAmount, days));
      }

      interestToPay =
        interestToPay +
        (await calculateInterest(principleAmt, differenceInDays(today, tDate)));

      remainingLoan = principleAmt;
    }
  } else {
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
  }

  return {
    remainingLoan: remainingLoan || 0,
    totalInterest: interestToPay || 0,
    name: `${user?.firstName} ${user?.lastName}`
  };
}
