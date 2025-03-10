import { ethers } from 'ethers';

const BEETS_VAULT_ABI = [
  "function swap(SingleSwap memory singleSwap, FundManagement memory funds, uint256 limit, uint256 deadline) returns (uint256)",
  "function batchSwap(SwapKind kind, BatchSwapStep[] memory swaps, address[] memory assets, FundManagement memory funds, int256[] memory limits, uint256 deadline) returns (int256[] memory)"
];

export const generateSingleSwapCalldata = (
  poolId: string,
  tokenIn: string,
  tokenOut: string,
  amount: string,
  userData: string = '0x'
): string => {
  const iface = new ethers.Interface(BEETS_VAULT_ABI);
  
  return iface.encodeFunctionData("swap", [{
    poolId,
    kind: 0, // GIVEN_IN
    assetIn: tokenIn,
    assetOut: tokenOut,
    amount,
    userData
  }]);
};

export const generateBatchSwapCalldata = (
  poolIds: string[],
  tokens: string[],
  amounts: string[]
): string => {
  const iface = new ethers.Interface(BEETS_VAULT_ABI);
  
  const swaps = poolIds.map((poolId, i) => ({
    poolId,
    assetInIndex: i,
    assetOutIndex: i + 1,
    amount: amounts[i],
    userData: '0x'
  }));

  return iface.encodeFunctionData("batchSwap", [
    0, // GIVEN_IN
    swaps,
    tokens,
    amounts
  ]);
};
