/*
  Warnings:

  - The `color` column on the `Column` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Colors" AS ENUM ('CYAN', 'BLUE', 'PURPLE', 'GREEN', 'YELLOW', 'RED', 'PINK');

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "color",
ADD COLUMN     "color" "Colors" NOT NULL DEFAULT 'CYAN';

-- DropEnum
DROP TYPE "Color";
