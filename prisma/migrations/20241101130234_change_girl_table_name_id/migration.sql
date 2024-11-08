/*
  Warnings:

  - A unique constraint covering the columns `[name_id]` on the table `girls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `girls_name_id_key` ON `girls`(`name_id`);
