import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const agent = await createBrianAgent({
  apiKey: process.env.BRIAN_AI_API_KEY,
  llm: new ChatOpenAI({ openAIApiKey: process.env.GROQ_API_KEY }),
});

export async function findBestSwapXDexStrategy(order) {
  const response = await agent.invoke({
    input: `Find the best swap execution on SwapX Algebra for ${order.sourceAmount} ${order.sourceToken} → ${order.targetToken}.
    Return calldata for execution, bidAmount, and expected targets.`
  });

  const strategy = JSON.parse(response);

  return {
    bidAmount: strategy.bidAmount,
    callData: strategy.callData,  
    targets: strategy.targets
  };
}
