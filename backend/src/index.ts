import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import routes from './api/routes';
import { errorHandler, requestLogger } from './api/middleware';
import { startEventListeners, stopEventListeners } from './blockchain/events';
import { startAuctionFinalizationJob, stopAuctionFinalizationJob } from './services/scheduler';
import logger from './utils/logger';
import prisma from './db/client';

// Create Express app
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(express.json()); // Parse JSON bodies
app.use(requestLogger); // Log requests

// Apply routes
app.use('/api', routes);

// Apply error handler
app.use(errorHandler);

// Start the server
const server = app.listen(config.port, () => {
  logger.info(`Server started on port ${config.port}`);
});

// Start blockchain event listeners and scheduler
let auctionFinalizationJob: any;

const startServices = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    logger.info('Connected to database');
    
    // Start blockchain event listeners
    await startEventListeners();
    
    // Start auction finalization job
    auctionFinalizationJob = startAuctionFinalizationJob();
    
    logger.info('All services started successfully');
  } catch (error) {
    logger.error(`Failed to start services: ${error}`);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down...');
  
  // Stop the finalization job
  if (auctionFinalizationJob) {
    stopAuctionFinalizationJob(auctionFinalizationJob);
  }
  
  // Stop blockchain event listeners
  stopEventListeners();
  
  // Close database connection
  await prisma.$disconnect();
  logger.info('Database connection closed');
  
  // Close the server
  server.close(() => {
    logger.info('Server stopped');
    process.exit(0);
  });
  
  // Force exit after timeout
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle process termination
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start services
startServices();