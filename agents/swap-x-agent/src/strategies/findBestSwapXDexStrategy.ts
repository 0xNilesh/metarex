import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const agent = await createBrianAgent({
  apiKey: process.env.BRIAN_AI_API_KEY as `0xstring`,
  llm: new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY }),
  privateKeyOrAccount: process.env.SOLVER_PRIVATE_KEY as `0xstring`
});

export async function findBestSwapXDexStrategy(order) {
  const prompt = `
    As a MEV searcher, analyze and provide the optimal execution strategy for the following token swap:
    
    Source Token: ${order.sourceToken}
    Amount In: ${order.sourceAmount}
    Target Token: ${order.targetToken}
    Minimum Output: ${order.minTargetAmount}
    
    Requirements:
    1. Check liquidity across SwapX Algebra pools
    2. Calculate optimal path considering:
       - Slippage impact
       - Gas costs
       - Pool depths
       - Current market conditions
    3. Estimate maximum achievable output amount
    4. Generate execution calldata for:
       - Token approvals
       - Optimal swap route
       - Any necessary flash loan or multi-hop logic
    
    Return a JSON object with:
    {
      "bidAmount": "maximum guaranteed output amount in wei",
      "callData": ["array of execution calldata steps"],
      "targets": ["array of target contract addresses"],
      "expectedProfit": "estimated profit after gas",
      "route": "detailed swap route description"
    }
    
    Ensure bidAmount > ${order.minTargetAmount} to be competitive.
    `;

  const response: any = await agent.invoke({ input: prompt });
  const strategy = JSON.parse(response);

  return {
    bidAmount: strategy.bidAmount,
    callData: strategy.callData,
    targets: strategy.targets,
    // Note: We keep internal metrics but don't pass them to contract
    _expectedProfit: strategy.expectedProfit,
    _route: strategy.route
  };
}
