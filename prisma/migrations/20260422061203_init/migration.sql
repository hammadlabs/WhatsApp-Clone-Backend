-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT 'uuid',
    "phone_number" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");
