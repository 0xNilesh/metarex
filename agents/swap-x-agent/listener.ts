import { ethers } from "ethers";
import dotenv from "dotenv";
import { findBestSwapXDexStrategy } from "./swapXSolver.js"; // Updated import
import { submitBidToBackend } from "./submitBid.js";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SONIC_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const auctionContract = new ethers.Contract(process.env.AUCTION_MANAGER, [
    "event AuctionCreated(uint256 orderId)",
    "event AuctionFinalized(uint256 indexed orderId, address indexed winner, bytes strategy)"
], provider);

// 🚀 1. Listen for AuctionCreated → Get AI strategy → Submit bid
auctionContract.on("AuctionCreated", async (orderId) => {
    console.log(`🚀 [SwapX Agent] Auction started for order: ${orderId}`);

    const swapExecutor = new ethers.Contract(process.env.SWAP_EXECUTOR, [
        "function orders(uint256) view returns (address, address, uint256, address, uint256, bool)"
    ], provider);
    const order = await swapExecutor.orders(orderId);

    // Get calldata from AI agent
    const strategy = await findBestSwapXDexStrategy(order); // Updated function call
    console.log(`[SwapX Agent] Best strategy found:`, strategy);

    // Submit bid to backend
    await submitBidToBackend(orderId, process.env.SOLVER_ADDRESS, strategy);
});

// 🚀 2. Listen for AuctionFinalized → If this agent is the winner, execute order
auctionContract.on("AuctionFinalized", async (orderId, winner, strategy) => {
    console.log(`🏆 [SwapX Agent] Auction finalized for order: ${orderId}, Winner: ${winner}`);

    if (winner.toLowerCase() === process.env.SOLVER_ADDRESS.toLowerCase()) {
        console.log(`[SwapX Agent] We won! Executing order ${orderId}...`);

        const swapExecutor = new ethers.Contract(process.env.SWAP_EXECUTOR, [
            "function executeOrder(uint256 orderId, uint256 bidAmount, bytes[] calldata callData, address[] calldata targets)"
        ], wallet);

        const executionTx = await swapExecutor.executeOrder(orderId, strategy.bidAmount, strategy.callData, strategy.targets);
        console.log(`[SwapX Agent] Order executed! Tx: ${executionTx.hash}`);
    }
});
