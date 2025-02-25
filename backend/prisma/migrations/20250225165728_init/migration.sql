-- CreateTable
CREATE TABLE "Auction" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "winner" TEXT,
    "winningStrategy" TEXT,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "solver" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solver" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auction_orderId_key" ON "Auction"("orderId");

-- CreateIndex
CREATE INDEX "Auction_status_endTime_idx" ON "Auction"("status", "endTime");

-- CreateIndex
CREATE INDEX "Auction_orderId_idx" ON "Auction"("orderId");

-- CreateIndex
CREATE INDEX "Bid_auctionId_idx" ON "Bid"("auctionId");

-- CreateIndex
CREATE UNIQUE INDEX "Solver_address_key" ON "Solver"("address");

-- CreateIndex
CREATE INDEX "Solver_address_idx" ON "Solver"("address");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
