import express from 'express';
import { submitBid, getAuction, registerSolver, deactivateSolver } from './controllers';

const router = express.Router();

// Auction routes
router.post('/bids', submitBid);
router.get('/auctions/:orderId', getAuction);

// Solver routes
router.post('/solvers', registerSolver);
router.delete('/solvers/:address', deactivateSolver);

export default router;