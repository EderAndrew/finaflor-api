-- DropForeignKey
ALTER TABLE `pics` DROP FOREIGN KEY `pics_girl_id_fkey`;

-- AddForeignKey
ALTER TABLE `pics` ADD CONSTRAINT `pics_girl_id_fkey` FOREIGN KEY (`girl_id`) REFERENCES `girls`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
