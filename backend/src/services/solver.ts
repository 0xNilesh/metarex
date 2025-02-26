import { Solver } from '@prisma/client';
import prisma from '../db/client';
import logger from '../utils/logger';

export const createSolver = async (address: string, deposit: string): Promise<Solver> => {
  try {
    const solver = await prisma.solver.create({
      data: {
        address,
        active: true
      }
    });
    
    logger.info(`Created solver ${address} with deposit ${deposit}`);
    return solver;
  } catch (error) {
    logger.error(`Failed to create solver ${address}: ${error}`);
    throw error;
  }
};

export const deactivateSolver = async (address: string): Promise<Solver> => {
  try {
    const solver = await prisma.solver.update({
      where: { address },
      data: { active: false }
    });
    
    logger.info(`Deactivated solver ${address}`);
    return solver;
  } catch (error) {
    logger.error(`Failed to deactivate solver ${address}: ${error}`);
    throw error;
  }
};
