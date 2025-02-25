import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`Unhandled error: ${err.message}`);
  logger.error(err.stack);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

// Request logging middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.info(`${req.method} ${req.path} ${JSON.stringify(req.query)}`);
  next();
};