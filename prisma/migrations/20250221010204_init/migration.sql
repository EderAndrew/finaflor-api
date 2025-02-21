-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "girls" (
    "id" SERIAL NOT NULL,
    "name_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" BOOLEAN NOT NULL DEFAULT false,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "girls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pics" (
    "id" SERIAL NOT NULL,
    "pic_name" TEXT NOT NULL,
    "pic_url" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "girl_id" INTEGER NOT NULL,

    CONSTRAINT "pics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url_banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url_banner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selecteds" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "selecteds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "girls_name_id_key" ON "girls"("name_id");

-- AddForeignKey
ALTER TABLE "pics" ADD CONSTRAINT "pics_girl_id_fkey" FOREIGN KEY ("girl_id") REFERENCES "girls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
