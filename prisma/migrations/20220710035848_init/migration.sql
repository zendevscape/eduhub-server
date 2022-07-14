-- CreateEnum
CREATE TYPE "TransactionFlow" AS ENUM ('credit', 'debit');
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('deposit', 'withdrawal', 'transfer');
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM (
  'creating',
  'pending',
  'success',
  'failed',
  'canceled'
);
-- CreateTable
CREATE TABLE "callbacks" (
  "id" TEXT NOT NULL,
  "payload_id" TEXT NOT NULL,
  "payload" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "callbacks_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "tokens" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expiration" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "staff" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "guardians" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  CONSTRAINT "guardians_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "students" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "guardian_id" TEXT NOT NULL,
  "birth_date" TIMESTAMP(3) NOT NULL,
  "father_name" TEXT NOT NULL,
  "mother_name" TEXT NOT NULL,
  CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "balances" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "transactions" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "note" TEXT NOT NULL,
  "flow" "TransactionFlow" NOT NULL,
  "type" "TransactionType" NOT NULL,
  "amount" INTEGER NOT NULL,
  "previous_balance" INTEGER NOT NULL,
  "balance" INTEGER NOT NULL,
  "status" "TransactionStatus" NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "deposits" (
  "id" TEXT NOT NULL,
  "transaction_id" TEXT NOT NULL,
  "external_id" TEXT NOT NULL,
  "channel_category" TEXT NOT NULL,
  "channel_code" TEXT NOT NULL,
  "account_number" TEXT NOT NULL,
  "expiration" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "withdrawals" (
  "id" TEXT NOT NULL,
  "transaction_id" TEXT NOT NULL,
  "external_id" TEXT NOT NULL,
  "channel_category" TEXT NOT NULL,
  "channel_code" TEXT NOT NULL,
  "account_number" TEXT NOT NULL,
  CONSTRAINT "withdrawals_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "transfers" (
  "id" TEXT NOT NULL,
  "from_transaction_id" TEXT NOT NULL,
  "to_transaction_id" TEXT NOT NULL,
  CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "stores" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "owner_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "store_admins" (
  "id" TEXT NOT NULL,
  "store_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "store_admins_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "products" (
  "id" TEXT NOT NULL,
  "store_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "stock" INTEGER NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "orders" (
  "id" TEXT NOT NULL,
  "store_id" TEXT NOT NULL,
  "buyer_id" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "price" INTEGER NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "order_items" (
  "id" TEXT NOT NULL,
  "order_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "price" INTEGER NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);
-- CreateView
CREATE VIEW "staff_users" AS
SELECT "users"."id",
  "staff"."id" AS "staff_id",
  "users"."name",
  "users"."email",
  "users"."password",
  "users"."role",
  COALESCE("users"."role"->>'staff'::text, 'false'::text)::boolean AS is_active,
  "users"."created_at",
  "users"."updated_at"
FROM "staff"
  JOIN "users" ON "staff"."user_id" = "users"."id";
-- CreateView
CREATE VIEW "guardian_users" AS
SELECT "users"."id",
  "guardians"."id" AS "guardian_id",
  "users"."name",
  "users"."email",
  "users"."password",
  "users"."role",
  COALESCE("users"."role"->>'guardian'::text, 'false'::text)::boolean AS is_active,
  "users"."created_at",
  "users"."updated_at"
FROM "guardians"
  JOIN "users" ON "guardians"."user_id" = "users"."id";
-- CreateView
CREATE VIEW "student_users" AS
SELECT "users"."id",
  "students"."id" AS "student_id",
  "students"."guardian_id",
  "users"."name",
  "users"."email",
  "users"."password",
  "users"."role",
  "students"."birth_date",
  "students"."father_name",
  "students"."mother_name",
  COALESCE("users"."role"->>'student'::text, 'false'::text)::boolean AS is_active,
  "users"."created_at",
  "users"."updated_at"
FROM "students"
  JOIN "users" ON "students"."user_id" = "users"."id";
-- CreateView
CREATE VIEW "deposit_transactions" AS
SELECT "transactions"."id",
  "deposits"."id" AS "deposit_id",
  "transactions"."user_id",
  "transactions"."note",
  "transactions"."flow",
  "transactions"."type",
  "transactions"."amount",
  "transactions"."previous_balance",
  "transactions"."balance",
  "deposits"."external_id",
  "deposits"."channel_category",
  "deposits"."channel_code",
  "deposits"."account_number",
  "deposits"."expiration",
  "transactions"."status",
  "transactions"."created_at",
  "transactions"."updated_at"
FROM "deposits"
  JOIN "transactions" ON "deposits"."transaction_id" = "transactions"."id";
-- CreateView
CREATE VIEW "withdrawal_transactions" AS
SELECT "transactions"."id",
  "withdrawals"."id" AS "withdrawal_id",
  "transactions"."user_id",
  "transactions"."note",
  "transactions"."flow",
  "transactions"."type",
  "transactions"."amount",
  "transactions"."previous_balance",
  "transactions"."balance",
  "withdrawals"."external_id",
  "withdrawals"."channel_category",
  "withdrawals"."channel_code",
  "withdrawals"."account_number",
  "transactions"."status",
  "transactions"."created_at",
  "transactions"."updated_at"
FROM "withdrawals"
  JOIN "transactions" ON "withdrawals"."transaction_id" = "transactions"."id";
-- CreateView
CREATE VIEW "transfer_transactions" AS
SELECT "transactions"."id",
  "transfers"."id" AS "transfer_id",
  "transactions"."user_id",
  "transactions"."note",
  "transactions"."flow",
  "transactions"."type",
  "transactions"."amount",
  "transactions"."previous_balance",
  "transactions"."balance",
  "transactions"."user_id" AS "from_user_id",
  "to_transactions"."user_id" AS "to_user_id",
  "transactions"."status",
  "transactions"."created_at",
  "transactions"."updated_at"
FROM "transfers"
  JOIN "transactions" ON "transfers"."from_transaction_id" = "transactions"."id"
  JOIN "transactions" AS "to_transactions" ON "transfers"."to_transaction_id" = "to_transactions"."id"
UNION
SELECT "transactions"."id",
  "transfers"."id" AS "transfer_id",
  "transactions"."user_id",
  "transactions"."note",
  "transactions"."flow",
  "transactions"."type",
  "transactions"."amount",
  "transactions"."previous_balance",
  "transactions"."balance",
  "from_transactions"."user_id" AS "from_user_id",
  "transactions"."user_id" AS "to_user_id",
  "transactions"."status",
  "transactions"."created_at",
  "transactions"."updated_at"
FROM "transfers"
  JOIN "transactions" ON "transfers"."to_transaction_id" = "transactions"."id"
  JOIN "transactions" AS "from_transactions" ON "transfers"."from_transaction_id" = "from_transactions"."id";
-- CreateIndex
CREATE UNIQUE INDEX "callbacks_payload_id_key" ON "callbacks"("payload_id");
-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");
-- CreateIndex
CREATE UNIQUE INDEX "guardians_user_id_key" ON "guardians"("user_id");
-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");
-- CreateIndex
CREATE UNIQUE INDEX "balances_user_id_key" ON "balances"("user_id");
-- CreateIndex
CREATE UNIQUE INDEX "deposits_transaction_id_key" ON "deposits"("transaction_id");
-- CreateIndex
CREATE UNIQUE INDEX "withdrawals_transaction_id_key" ON "withdrawals"("transaction_id");
-- CreateIndex
CREATE UNIQUE INDEX "transfers_from_transaction_id_key" ON "transfers"("from_transaction_id");
-- CreateIndex
CREATE UNIQUE INDEX "transfers_to_transaction_id_key" ON "transfers"("to_transaction_id");
-- CreateIndex
CREATE UNIQUE INDEX "stores_name_key" ON "stores"("name");
-- AddForeignKey
ALTER TABLE "tokens"
ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "staff"
ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "guardians"
ADD CONSTRAINT "guardians_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "students"
ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "students"
ADD CONSTRAINT "students_guardian_id_fkey" FOREIGN KEY ("guardian_id") REFERENCES "guardians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "balances"
ADD CONSTRAINT "balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "transactions"
ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "deposits"
ADD CONSTRAINT "deposits_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "withdrawals"
ADD CONSTRAINT "withdrawals_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "transfers"
ADD CONSTRAINT "transfers_from_transaction_id_fkey" FOREIGN KEY ("from_transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "transfers"
ADD CONSTRAINT "transfers_to_transaction_id_fkey" FOREIGN KEY ("to_transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "stores"
ADD CONSTRAINT "stores_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "store_admins"
ADD CONSTRAINT "store_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "store_admins"
ADD CONSTRAINT "store_admins_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "products"
ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "orders"
ADD CONSTRAINT "orders_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "orders"
ADD CONSTRAINT "orders_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "order_items"
ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "order_items"
ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
