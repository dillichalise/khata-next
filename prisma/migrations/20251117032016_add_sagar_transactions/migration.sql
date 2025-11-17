-- CreateTable
CREATE TABLE sagar_transactions
(
    "id"         SERIAL              NOT NULL,
    "date"       TIMESTAMP(3)        NOT NULL,
    "type"       "TransactionAction" NOT NULL,
    "amount"     DECIMAL(10, 2)      NOT NULL,
    "remarks"    TEXT                NOT NULL,
    "created_at" TIMESTAMP(3)        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sagar_transactions_pkey" PRIMARY KEY ("id")
);
