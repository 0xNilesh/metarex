import { Auction, Bid } from '@prisma/client';
import prisma from '../db/client';
import { ethers } from 'ethers';
import { config } from '../config';
import logger from '../utils/logger';

// Auction status enum
export enum AuctionStatus {
  CREATED = 'created',
  ACTIVE = 'active',
  ENDING = 'ending', 
  FINALIZED = 'finalized',
  FAILED = 'failed'
}

// Type for auction with bids included
export type AuctionWithBids = Auction & {
  bids: Bid[];
};

// Create a new auction from blockchain event
export const createAuction = async (orderId: string, endTimeUnix: number): Promise<Auction> => {
  const endTime = new Date(endTimeUnix * 1000);
  
  try {
    const auction = await prisma.auction.create({
      data: {
        orderId,
        endTime,
        status: AuctionStatus.CREATED,
      }
    });
    
    logger.info(`Created auction for order ${orderId} ending at ${endTime}`);
    return auction;
  } catch (error) {
    logger.error(`Failed to create auction for order ${orderId}: ${error}`);
    throw error;
  }
};

// Add a bid to an auction
export const addBid = async (
  orderId: string, 
  solver: string, 
  strategy: string,
  bidAmount: string,  // Add bidAmount parameter
  attempt: number = 0
): Promise<Bid | null> => {
  try {
    // Find the auction
    const auction = await prisma.auction.findUnique({
      where: { orderId },
    });

    if (!auction) {
      if (attempt < 3) {
        logger.warn(`Auction ${orderId} not found, retrying in 5s... (Attempt ${attempt + 1}/3)`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
        return addBid(orderId, solver, strategy, bidAmount, attempt + 1); // Retry
      }
      logger.error(`Auction ${orderId} not found after 3 attempts, giving up.`);
      return null;
    }
    
    if (!auction) {
      logger.warn(`Attempted to bid on non-existent auction ${orderId}`);
      return null;
    }
    
    if (auction.status === AuctionStatus.FINALIZED || auction.status === AuctionStatus.FAILED) {
      logger.warn(`Attempted to bid on finalized/failed auction ${orderId}`);
      return null;
    }
    
    if (new Date() >= auction.endTime) {
      logger.warn(`Attempted to bid on ended auction ${orderId}`);
      return null;
    }
    
    // Create the bid
    const bid = await prisma.bid.create({
      data: {
        solver,
        strategy,
        bidAmount,  // Add bidAmount
        auction: { connect: { id: auction.id } }
      }
    });
    
    // Update auction status to active if it was just created
    if (auction.status === AuctionStatus.CREATED) {
      await prisma.auction.update({
        where: { id: auction.id },
        data: { status: AuctionStatus.ACTIVE }
      });
    }
    
    logger.info(`Recorded bid from solver ${solver} for auction ${orderId}`);
    return bid;
  } catch (error) {
    logger.error(`Failed to add bid for auction ${orderId}: ${error}`);
    throw error;
  }
};

// Get auctions that need to be finalized
export const getAuctionsToFinalize = async (): Promise<AuctionWithBids[]> => {
  try {
    return await prisma.auction.findMany({
      where: {
        status: { in: [AuctionStatus.CREATED, AuctionStatus.ACTIVE] },
        endTime: { lte: new Date() }
      },
      include: { bids: true }
    });
  } catch (error) {
    logger.error(`Failed to get auctions to finalize: ${error}`);
    throw error;
  }
};

// Determine the winning bid for an auction
export const findWinningBid = (auction: AuctionWithBids): Bid | null => {
  if (auction.bids.length === 0) return null;
  
  // Sort bids by bidAmount (highest first)
  const sortedBids = [...auction.bids].sort((a, b) => {
    const amountA = BigInt(a.bidAmount);
    const amountB = BigInt(b.bidAmount);
    return amountB > amountA ? 1 : amountB < amountA ? -1 : 0;
  });
  
  return sortedBids[0];
};

// Mark an auction as finalized
export const finalizeAuction = async (
  auctionId: string, 
  winner: string, 
  winningStrategy: string
): Promise<Auction> => {
  try {
    return await prisma.auction.update({
      where: { id: auctionId },
      data: {
        status: AuctionStatus.FINALIZED,
        winner,
        winningStrategy
      }
    });
  } catch (error) {
    logger.error(`Failed to finalize auction ${auctionId}: ${error}`);
    throw error;
  }
};

// Mark an auction as failed (no valid bids)
export const markAuctionFailed = async (auctionId: string): Promise<Auction> => {
  try {
    return await prisma.auction.update({
      where: { id: auctionId },
      data: { status: AuctionStatus.FAILED }
    });
  } catch (error) {
    logger.error(`Failed to mark auction ${auctionId} as failed: ${error}`);
    throw error;
  }
};

// Get auction details by orderId
export const getAuctionByOrderId = async (orderId: string): Promise<AuctionWithBids | null> => {
  try {
    return await prisma.auction.findUnique({
      where: { orderId },
      include: { bids: true }
    });
  } catch (error) {
    logger.error(`Failed to get auction ${orderId}: ${error}`);
    throw error;
  }
};