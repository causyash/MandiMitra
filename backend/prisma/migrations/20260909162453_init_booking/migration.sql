-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "tokenNumber" TEXT NOT NULL,
    "farmerName" TEXT NOT NULL,
    "farmerPhone" TEXT NOT NULL,
    "cropId" INTEGER NOT NULL,
    "mandiId" INTEGER NOT NULL,
    "quantityQuintal" DOUBLE PRECISION NOT NULL,
    "slotDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_tokenNumber_key" ON "Booking"("tokenNumber");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_mandiId_fkey" FOREIGN KEY ("mandiId") REFERENCES "Mandi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
