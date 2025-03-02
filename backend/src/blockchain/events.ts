import { ethers } from 'ethers';
import { config } from '../config';
import { createAuction } from '../services/auction';
import { createSolver, deactivateSolver } from '../services/solver';
import logger from '../utils/logger';

// ABI for the AuctionManager contract (including the struct fields)
const AuctionManagerABI = [
  "event AuctionCreated(uint256 indexed orderId)",
  "event AuctionFinalized(uint256 orderId, address winner, bytes strategy)",
  "function auctions(uint256) view returns (uint256 orderId, address winner, bytes strategy, bool finalized, uint256 endTime)"
];

// ABI for the SolverRegistry contract
const SolverRegistryABI = [
  "event SolverRegistered(address indexed solver, uint256 deposit)",
  "event SolverDeregistered(address indexed solver, uint256 deposit)"
];

// Create providers and contract instances
const provider = new ethers.JsonRpcProvider(config.provider);
const auctionManager = new ethers.Contract(
  config.auctionManagerAddress,
  AuctionManagerABI,
  provider
);
const solverRegistry = new ethers.Contract(
  config.solverRegistryAddress,
  SolverRegistryABI,
  provider
);

// Start listening for events
export const startEventListeners = async () => {
  logger.info('Starting blockchain event listeners');

  // Listen for AuctionCreated events
  auctionManager.on("AuctionCreated", async (orderId) => {
    logger.info(`Received AuctionCreated event for orderId: ${orderId.toString()}`);

    try {
      const auction = await auctionManager.auctions(orderId);
      // Convert BigInt values to strings before logging
      const auctionData = {
        orderId: auction.orderId.toString(),
        winner: auction.winner,
        strategy: auction.strategy,
        finalized: auction.finalized,
        endTime: auction.endTime.toString()
      };
      logger.info(`Fetched auction data: ${JSON.stringify(auctionData)}`);
      await createAuction(orderId.toString(), Number(auction.endTime));
    } catch (error) {
      logger.error(`Error processing AuctionCreated event: ${error}`);
    }
  });

  // Listen for AuctionFinalized events (for monitoring purposes)
  auctionManager.on("AuctionFinalized", async (orderId, winner, strategy) => {
    logger.info(`Auction ${orderId.toString()} was finalized with winner ${winner}`);
  });

  // Listen for SolverRegistered events
  solverRegistry.on("SolverRegistered", async (solver, deposit) => {
    logger.info(`Received SolverRegistered event for solver: ${solver}`);

    try {
      await createSolver(solver, deposit.toString());
    } catch (error) {
      logger.error(`Error processing SolverRegistered event: ${error}`);
    }
  });

  // Listen for SolverDeregistered events
  solverRegistry.on("SolverDeregistered", async (solver, deposit) => {
    logger.info(`Received SolverDeregistered event for solver: ${solver}`);

    try {
      await deactivateSolver(solver);
    } catch (error) {
      logger.error(`Error processing SolverDeregistered event: ${error}`);
    }
  });

  logger.info('Blockchain event listeners started successfully');
};

// Stop listening to events
export const stopEventListeners = () => {
  auctionManager.removeAllListeners();
  solverRegistry.removeAllListeners();
  logger.info('Blockchain event listeners stopped');
};