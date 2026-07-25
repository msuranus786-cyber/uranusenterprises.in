-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_serviceSlug_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "approved" SET DEFAULT false,
ALTER COLUMN "serviceSlug" DROP NOT NULL;

-- CreateTable
CREATE TABLE "review_photos" (
    "id" SERIAL NOT NULL,
    "data" BYTEA NOT NULL,
    "contentType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "review_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_serviceSlug_fkey" FOREIGN KEY ("serviceSlug") REFERENCES "services"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_photos" ADD CONSTRAINT "review_photos_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
