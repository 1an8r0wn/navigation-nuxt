/*
  Warnings:

  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `delete_flag` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `delete_flag` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `site` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `site` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(80)`.
  - Added the required column `updated_at` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `site` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `site` DROP FOREIGN KEY `Site_category_name_fkey`;

-- DropIndex
DROP INDEX `Category_name_key` ON `category`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createdAt`,
    DROP COLUMN `delete_flag`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `visibility`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_visibility` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `option` MODIFY `value` TEXT NULL;

-- AlterTable
ALTER TABLE `site` DROP COLUMN `category_name`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `delete_flag`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `visibility`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_visibility` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(80) NOT NULL;

-- AddForeignKey
ALTER TABLE `site` ADD CONSTRAINT `site_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_sort_key` TO `category_sort_key`;

-- RenameIndex
ALTER TABLE `option` RENAME INDEX `Option_name_key` TO `option_name_key`;
