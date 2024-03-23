-- AlterTable
ALTER TABLE `category` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `site` ADD COLUMN `site_type` JSON NULL,
    MODIFY `updated_at` DATETIME(3) NULL;
