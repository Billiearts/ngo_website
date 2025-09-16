/*
  Warnings:

  - You are about to drop the column `currency` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `stripePayment` on the `Donation` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Donation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[stripeSession]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeSession` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Donation_stripePayment_key";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "currency",
DROP COLUMN "email",
DROP COLUMN "stripePayment",
ADD COLUMN     "donorEmail" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "stripeSession" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Donation_stripeSession_key" ON "Donation"("stripeSession");
