import { ethers } from 'ethers';
import { config } from '../config';
import { createAuction } from '../services/auction';
import logger from '../utils/logger';

// ABI for the AuctionManager contract (just the events we need)
const AuctionManagerABI = [
  "event AuctionCreated(uint256 orderId)",
  "event AuctionFinalized(uint256 orderId, address winner, bytes strategy)"
];

// Create a provider and contract instance
const provider = new ethers.JsonRpcProvider(config.provider);
const auctionManager = new ethers.Contract(
  config.auctionManagerAddress,
  AuctionManagerABI,
  provider
);

// Start listening for AuctionCreated events
export const startEventListeners = async () => {
  logger.info('Starting blockchain event listeners');

  // Listen for AuctionCreated events
  auctionManager.on("AuctionCreated", async (orderId) => {
    logger.info(`Received AuctionCreated event for orderId: ${orderId.toString()}`);

    try {
      // Get auction details from contract
      const auction = await auctionManager.auctions(orderId);
      await createAuction(orderId.toString(), auction.endTime.toNumber());
    } catch (error) {
      logger.error(`Error processing AuctionCreated event: ${error}`);
    }
  });

  // Listen for AuctionFinalized events (for monitoring purposes)
  auctionManager.on("AuctionFinalized", async (orderId, winner, strategy) => {
    logger.info(`Auction ${orderId.toString()} was finalized with winner ${winner}`);
  });

  logger.info('Blockchain event listeners started successfully');
};

// Stop listening to events
export const stopEventListeners = () => {
  auctionManager.removeAllListeners();
  logger.info('Blockchain event listeners stopped');
};