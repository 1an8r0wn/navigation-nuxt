-- CreateTable
CREATE TABLE `Option` (
    `name` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NULL,

    UNIQUE INDEX `Option_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
