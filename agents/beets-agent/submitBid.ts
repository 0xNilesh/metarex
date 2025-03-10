import axios from "axios";

export async function submitBidToBackend(orderId, solver, strategy) {
    try {
        const response = await axios.post(`${process.env.AUCTION_BACKEND_URL}/submitBid`, {
            orderId,
            solver,
            strategy
        });

        console.log(`[Shadow Agent] Bid submitted:`, response.data);
    } catch (error) {
        console.error(`[Shadow Agent] Failed to submit bid:`, error.response ? error.response.data : error.message);
    }
}
