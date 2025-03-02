import { Solver } from '@prisma/client';
import prisma from '../db/client';
import logger from '../utils/logger';

export const createSolver = async (address: string, deposit: string): Promise<Solver> => {
  try {
    // First try to find if solver already exists
    const existingSolver = await prisma.solver.findUnique({
      where: { address }
    });

    if (existingSolver) {
      // If solver exists, just update active status
      const solver = await prisma.solver.update({
        where: { address },
        data: { active: true }
      });
      logger.info(`Reactivated existing solver ${address} with deposit ${deposit}`);
      return solver;
    } else {
      // If solver doesn't exist, create new entry
      const solver = await prisma.solver.create({
        data: {
          address,
          active: true
        }
      });
      logger.info(`Created new solver ${address} with deposit ${deposit}`);
      return solver;
    }
  } catch (error) {
    logger.error(`Failed to create/update solver ${address}: ${error}`);
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
