import { Request, Response } from 'express';
import { addBid, getAuctionByOrderId } from '../services/auction';
import logger from '../utils/logger';
import prisma from '../db/client';

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
    
    // Add the bid
    const bid = await addBid(orderId, solver, strategy);
    
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

// Register a solver
export const registerSolver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address, name } = req.body;
    
    if (!address) {
      res.status(400).json({ 
        success: false, 
        message: 'Missing required field: address' 
      });
      return;
    }
    
    // Check if solver already exists
    const existingSolver = await prisma.solver.findUnique({
      where: { address }
    });
    
    if (existingSolver) {
      // Update the solver
      const updatedSolver = await prisma.solver.update({
        where: { address },
        data: { 
          name: name || existingSolver.name,
          active: true
        }
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Solver updated successfully', 
        solver: updatedSolver 
      });
      return;
    }
    
    // Create a new solver
    const solver = await prisma.solver.create({
      data: { address, name }
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Solver registered successfully', 
      solver 
    });
  } catch (error) {
    logger.error(`Error registering solver: ${error}`);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Deactivate a solver
export const deactivateSolver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    
    const solver = await prisma.solver.findUnique({
      where: { address }
    });
    
    if (!solver) {
      res.status(404).json({ 
        success: false, 
        message: 'Solver not found' 
      });
      return;
    }
    
    // Deactivate the solver
    const updatedSolver = await prisma.solver.update({
      where: { address },
      data: { active: false }
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Solver deactivated successfully', 
      solver: updatedSolver 
    });
  } catch (error) {
    logger.error(`Error deactivating solver: ${error}`);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};