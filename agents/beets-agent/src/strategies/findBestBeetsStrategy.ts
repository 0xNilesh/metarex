import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const agent = await createBrianAgent({
  apiKey: process.env.BRIAN_AI_API_KEY as `0xstring`,
  llm: new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY }),
  privateKeyOrAccount: process.env.SOLVER_PRIVATE_KEY as `0xstring`
});

export async function findBestBeetsStrategy(order) {
  const prompt = `
    As a Beethoven X (Beets) DEX specialist, analyze and provide the optimal execution strategy for the following token swap:
    
    Source Token: ${order.sourceToken}
    Amount In: ${order.sourceAmount}
    Target Token: ${order.targetToken}
    Minimum Output: ${order.minTargetAmount}
    
    Requirements:
    1. Check liquidity across Beethoven X pools including:
       - Weighted pools
       - Stable pools
       - Boosted pools
    2. Calculate optimal path considering:
       - Pool weights and balances
       - Flash swap opportunities
       - Smart order routing
       - Gas optimization
    3. Estimate maximum achievable output using:
       - Beets price impact calculation
       - Pool fees and slippage
    4. Generate execution calldata for:
       - Beets vault approval
       - Optimal swap path execution
       - Flash loan integration if needed
    
    Return a JSON object with:
    {
      "bidAmount": "maximum guaranteed output amount in wei",
      "callData": ["array of beets vault execution steps"],
      "targets": ["array of beets contract addresses"],
      "expectedProfit": "estimated profit after gas",
      "route": "detailed beets pool route"
    }
    
    Ensure bidAmount > ${order.minTargetAmount} for competitive edge.
    Consider Beethoven X's unique weighted pool mechanics for optimal execution.
    `;

  const response: any = await agent.invoke({ input: prompt });
  const strategy = JSON.parse(response);

  return {
    bidAmount: strategy.bidAmount,
    callData: strategy.callData,
    targets: strategy.targets,
    _expectedProfit: strategy.expectedProfit,
    _route: strategy.route
  };
}
