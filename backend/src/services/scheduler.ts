import { CronJob } from 'cron';
import { config } from '../config';
import { getAuctionsToFinalize, findWinningBid, finalizeAuction, markAuctionFailed } from './auction';
import { finalizeAuctionOnChain } from '../blockchain/transactions';
import logger from '../utils/logger';

// Job to check for auctions that need to be finalized
export const startAuctionFinalizationJob = (): CronJob => {
  const job = new CronJob(
    config.auctionCheckInterval,
    async () => {
      try {
        logger.debug('Running auction finalization check');
        
        // Get auctions that have ended but aren't finalized yet
        const auctionsToFinalize = await getAuctionsToFinalize();
        
        if (auctionsToFinalize.length === 0) {
          logger.debug('No auctions to finalize');
          return;
        }
        
        logger.info(`Found ${auctionsToFinalize.length} auctions to finalize`);
        
        // Process each auction
        for (const auction of auctionsToFinalize) {
          try {
            // Find the winning bid
            const winningBid = findWinningBid(auction);
            
            if (winningBid) {
              // Finalize the auction on-chain
              const success = await finalizeAuctionOnChain(
                auction.orderId,
                winningBid.solver,
                winningBid.strategy
              );
              
              if (success) {
                // Update the auction in the database
                await finalizeAuction(
                  auction.id,
                  winningBid.solver,
                  winningBid.strategy
                );
                logger.info(`Auction ${auction.orderId} finalized with winner ${winningBid.solver}`);
              }
            } else {
              logger.warn(`No valid bids for auction ${auction.orderId}`);
              await markAuctionFailed(auction.id);
            }
          } catch (error) {
            logger.error(`Error processing auction ${auction.orderId}: ${error}`);
          }
        }
      } catch (error) {
        logger.error(`Error in auction finalization job: ${error}`);
      }
    },
    null,
    true // Start the job immediately
  );
  
  logger.info('Auction finalization job started');
  return job;
};

// Stop the job
export const stopAuctionFinalizationJob = (job: CronJob): void => {
  if (job) {
    job.stop();
    logger.info('Auction finalization job stopped');
  }
};