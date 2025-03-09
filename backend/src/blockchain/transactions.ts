import { ethers } from 'ethers';
import { config } from '../config';
import logger from '../utils/logger';

// ABI for the AuctionManager contract (just the functions we need)
const AuctionManagerABI = [
  "function finalizeAuction(uint256 orderId, address winner, bytes calldata strategy) external"
];

// Create a provider and wallet
const provider = new ethers.JsonRpcProvider(config.provider);
const wallet = new ethers.Wallet(config.privateKey, provider);

// Create a contract instance with the signer
const auctionManager = new ethers.Contract(
  config.auctionManagerAddress,
  AuctionManagerABI,
  wallet
);

// Finalize an auction on-chain
export const finalizeAuctionOnChain = async (
  orderId: string,
  winner: string,
  strategy: string
): Promise<boolean> => {
  try {
    logger.info(`Finalizing auction ${orderId} on blockchain with winner ${winner}`);
    
    // Convert the strategy string to bytes
    const strategyBytes = strategy;
    
    // Submit the transaction
    const tx = await auctionManager.finalizeAuction(
      orderId,
      winner,
      strategyBytes
    );
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    
    logger.info(`Auction ${orderId} finalized on-chain in tx ${receipt.transactionHash}`);
    return true;
  } catch (error) {
    logger.error(`Failed to finalize auction ${orderId} on-chain: ${error}`);
    return false;
  }
};