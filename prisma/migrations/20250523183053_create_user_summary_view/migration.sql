DROP VIEW IF EXISTS user_summary;

CREATE OR REPLACE VIEW user_summary AS
SELECT
    u.id AS user_id,
    u.first_name || ' ' || u.last_name AS full_name,
    u.email,
    COALESCE(SUM(CASE WHEN t.type = 'MONTHLY_SAVING' THEN t.amount ELSE 0 END), 0) AS total_savings,
    COALESCE(SUM(CASE WHEN t.type = 'INTEREST' THEN t.amount ELSE 0 END), 0) AS total_interest_paid,
    COALESCE(SUM(CASE WHEN t.type = 'FINE' THEN t.amount ELSE 0 END), 0) AS total_fine_paid,
    COALESCE(SUM(CASE WHEN t.type = 'LOAN' THEN t.amount ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN t.type = 'LOAN_RETURN' THEN t.amount ELSE 0 END), 0) AS remaining_loan
FROM users u
         LEFT JOIN transactions t ON u.id = t.user_id
GROUP BY u.id, u.first_name, u.last_name;