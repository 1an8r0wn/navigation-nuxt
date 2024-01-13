-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `sort` INTEGER NOT NULL,
    `is_secondary_category` BOOLEAN NOT NULL DEFAULT false,
    `is_sensitive` BOOLEAN NOT NULL DEFAULT false,
    `visibility` BOOLEAN NOT NULL DEFAULT true,
    `delete_flag` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    UNIQUE INDEX `Category_sort_key`(`sort`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `url` TEXT NOT NULL,
    `logo` TEXT NULL,
    `visits_count` INTEGER NOT NULL DEFAULT 0,
    `is_sensitive` BOOLEAN NOT NULL DEFAULT false,
    `visibility` BOOLEAN NOT NULL DEFAULT true,
    `delete_flag` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_category_name_fkey` FOREIGN KEY (`category_name`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
