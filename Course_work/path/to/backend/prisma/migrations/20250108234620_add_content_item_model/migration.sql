-- CreateTable
CREATE TABLE "ContentItem" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);
