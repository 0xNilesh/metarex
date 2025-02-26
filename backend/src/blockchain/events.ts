import { ethers } from 'ethers';
import { config } from '../config';
import { createAuction } from '../services/auction';
import { createSolver, deactivateSolver } from '../services/solver';
import logger from '../utils/logger';

// ABI for the AuctionManager contract (just the events we need)
const AuctionManagerABI = [
  "event AuctionCreated(uint256 orderId)",
  "event AuctionFinalized(uint256 orderId, address winner, bytes strategy)"
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