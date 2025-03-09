import { Request, Response } from 'express';
import { addBid, getAuctionByOrderId } from '../services/auction';
import logger from '../utils/logger';
import prisma from '../db/client';
import { ethers } from "ethers";

// Submit a bid for an auction
export const submitBid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, solver, strategy } = req.body;
    
    // Validate inputs
    if (!orderId || !solver || !strategy) {
      res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: orderId, solver, strategy' 
      });
      return;
    }
    
    // Check if solver is registered
    const registeredSolver = await prisma.solver.findUnique({
      where: { address: solver }
    });
    
    if (!registeredSolver || !registeredSolver.active) {
      res.status(403).json({ 
        success: false, 
        message: 'Solver not registered or inactive' 
      });
      return;
    }

    // Decode strategy to extract bidAmount
    let bidAmount: any;
    try {
      const abiCoder = ethers.AbiCoder.defaultAbiCoder();
      const decoded = abiCoder.decode(
        ["address", "address[]", "bytes[]", "uint256"],
        strategy
    );
      bidAmount = decoded[3]; // Extract bidAmount (4th parameter)
    } catch (decodeError) {
      console.error("❌ [Error] Failed to decode strategy:", decodeError);
      res.status(400).json({
        success: false,
        message: "Invalid strategy encoding"
      });
      return;
    }
    
    console.log(`📌 [Extracted Bid Amount]: ${bidAmount.toString()}`);
    
    // Add the bid
    const bid = await addBid(orderId, solver, strategy, bidAmount.toString());
    
    if (!bid) {
      res.status(400).json({ 
        success: false, 
        message: 'Failed to submit bid, auction may not exist or be closed' 
      });
      return;
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Bid submitted successfully', 
      bid 
    });
  } catch (error) {
    logger.error(`Error submitting bid: ${error}`);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Get auction details
export const getAuction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    
    const auction = await getAuctionByOrderId(orderId);
    
    if (!auction) {
      res.status(404).json({ 
        success: false, 
        message: 'Auction not found' 
      });
      return;
    }
    
    res.status(200).json({ 
      success: true, 
      auction 
    });
  } catch (error) {
    logger.error(`Error getting auction: ${error}`);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};
