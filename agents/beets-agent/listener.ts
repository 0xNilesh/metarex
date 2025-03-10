import { ethers } from "ethers";
import dotenv from "dotenv";
import { findBestBeetsStrategy } from "./src/strategies/findBestBeetsStrategy.js";
import { submitBidToBackend } from "./submitBid";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SONIC_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const auctionContract = new ethers.Contract(process.env.AUCTION_MANAGER, [
    "event AuctionCreated(uint256 orderId)",
    "event AuctionFinalized(uint256 indexed orderId, address indexed winner, bytes strategy)"
], provider);

auctionContract.on("AuctionCreated", async (orderId) => {
    console.log(`🎵 [Beets Agent] Auction started for order: ${orderId}`);

    const swapExecutor = new ethers.Contract(process.env.SWAP_EXECUTOR, [
        "function orders(uint256) view returns (address, address, uint256, address, uint256, bool)"
    ], provider);
    const order = await swapExecutor.orders(orderId);

    const strategy = await findBestBeetsStrategy(order);
    console.log(`[Beets Agent] Best strategy found:`, strategy);

    await submitBidToBackend(orderId, process.env.SOLVER_ADDRESS, strategy);
});

auctionContract.on("AuctionFinalized", async (orderId, winner, strategy) => {
    console.log(`🏆 [Beets Agent] Auction finalized for order: ${orderId}, Winner: ${winner}`);

    if (winner.toLowerCase() === process.env.SOLVER_ADDRESS.toLowerCase()) {
        console.log(`[Beets Agent] We won! Executing order ${orderId}...`);

        const swapExecutor = new ethers.Contract(process.env.SWAP_EXECUTOR, [
            "function executeOrder(uint256 orderId, uint256 bidAmount, bytes[] calldata callData, address[] calldata targets)"
        ], wallet);

        const executionTx = await swapExecutor.executeOrder(orderId, strategy.bidAmount, strategy.callData, strategy.targets);
        console.log(`[Beets Agent] Order executed! Tx: ${executionTx.hash}`);
    }
});
