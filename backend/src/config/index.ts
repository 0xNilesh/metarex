import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Blockchain configuration
  provider: process.env.RPC_URL || 'http://localhost:8545',
  privateKey: process.env.PRIVATE_KEY || '',
  
  // Contract addresses
  auctionManagerAddress: process.env.AUCTION_MANAGER_ADDRESS || '',
  solverRegistryAddress: process.env.SOLVER_REGISTRY_ADDRESS || '',
  swapExecutorAddress: process.env.SWAP_EXECUTOR_ADDRESS || '',
  
  // Cron settings
  auctionCheckInterval: process.env.AUCTION_CHECK_INTERVAL || '*/30 * * * * *', // Every 30 seconds
  
  // Auction settings
  minBidInterval: parseInt(process.env.MIN_BID_INTERVAL || '1000', 10), // Minimum ms between bids
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info'
};