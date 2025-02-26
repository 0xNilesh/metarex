import express from 'express';
import { submitBid, getAuction } from './controllers';

const router = express.Router();

// Auction routes
router.post('/bids', submitBid);
router.get('/auctions/:orderId', getAuction);

export default router;