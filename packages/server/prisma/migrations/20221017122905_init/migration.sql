-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "shared" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL DEFAULT '',
    "token" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
