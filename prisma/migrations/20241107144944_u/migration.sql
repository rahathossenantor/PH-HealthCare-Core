/*
  Warnings:

  - You are about to drop the column `paymentGatewayData` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentGatewayData",
ADD COLUMN     "paymentGateway" JSONB;
