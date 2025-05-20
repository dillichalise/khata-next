SELECT
  u.id AS user_id,
  ((u.first_name || ' ' :: text) || u.last_name) AS full_name,
  COALESCE(
    sum(
      CASE
        WHEN (t.type = 'MONTHLY_SAVING' :: "TransactionType") THEN t.amount
        ELSE (0) :: numeric
      END
    ),
    (0) :: numeric
  ) AS total_savings,
  COALESCE(
    sum(
      CASE
        WHEN (t.type = 'INTEREST' :: "TransactionType") THEN t.amount
        ELSE (0) :: numeric
      END
    ),
    (0) :: numeric
  ) AS total_interest_paid,
  COALESCE(
    sum(
      CASE
        WHEN (t.type = 'FINE' :: "TransactionType") THEN t.amount
        ELSE (0) :: numeric
      END
    ),
    (0) :: numeric
  ) AS total_fine_paid
FROM
  (
    users u
    LEFT JOIN transactions t ON ((u.id = t.user_id))
  )
GROUP BY
  u.id,
  u.first_name,
  u.last_name;