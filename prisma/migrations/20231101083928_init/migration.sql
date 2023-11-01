-- AlterTable
ALTER TABLE "Commment" ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Commment" ADD CONSTRAINT "Commment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
