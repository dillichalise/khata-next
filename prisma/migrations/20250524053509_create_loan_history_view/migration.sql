DROP VIEW IF EXISTS loan_history;

CREATE OR REPLACE VIEW loan_history AS
WITH full_loan_history AS (
    SELECT
        t.user_id,
        t.date AS transaction_date,
        t.type,
        t.amount,
        SUM(
        CASE
            WHEN t.type = 'LOAN' THEN t.amount
            WHEN t.type ='LOAN_RETURN' THEN -t.amount
            ELSE 0
            END
           ) OVER (PARTITION BY t.user_id ORDER BY t.date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_loan
    FROM transactions t
    WHERE t.type IN ('LOAN', 'LOAN_RETURN', 'INTEREST')
),
     transaction_with_prev_data AS (
         SELECT
             user_id,
             transaction_date,
             type,
             amount,
             running_loan,
             LAG(transaction_date) OVER (PARTITION BY user_id ORDER BY transaction_date) AS prev_date,
             LAG(running_loan) OVER (PARTITION BY user_id ORDER BY transaction_date) AS prev_remaining_loan
         FROM full_loan_history
     ),
     calculated_interest AS (
         SELECT
             th.user_id,
             th.transaction_date,
             th.type AS description,
             CASE
                 WHEN th.type = 'LOAN' THEN 'Loan taken'
                 WHEN th.type = 'LOAN_RETURN' THEN 'Loan partially paid'
                 WHEN th.type = 'INTEREST' THEN 'Interest paid'
                 ELSE ''
                 END AS remarks,
             th.amount,
             th.running_loan AS remaining_loan,
             EXTRACT(DAY FROM th.transaction_date - COALESCE(th.prev_date, th.transaction_date))::INT AS total_days,
             CASE
                 WHEN th.type = 'INTEREST' THEN th.amount
                 ELSE ROUND((COALESCE(th.prev_remaining_loan, th.running_loan) * 0.10 * EXTRACT(DAY FROM th.transaction_date - COALESCE(th.prev_date, th.transaction_date))) / 365, 2)
                 END AS interest_amount
         FROM transaction_with_prev_data th
     )
SELECT
    ROW_NUMBER() OVER (ORDER BY transaction_date, user_id) AS id,
    user_id,
    transaction_date,
    description,
    remarks,
    amount,
    remaining_loan,
    total_days,
    interest_amount
FROM calculated_interest;