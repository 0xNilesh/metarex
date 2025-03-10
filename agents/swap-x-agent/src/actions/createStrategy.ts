import { ethers } from 'ethers';

export const createStrategy = (
  solver: string,
  targets: string[],
  callData: string[],
  bidAmount: string
): string => {
  return ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address[]", "bytes[]", "uint256"],
    [solver, targets, callData, bidAmount]
  );
};
