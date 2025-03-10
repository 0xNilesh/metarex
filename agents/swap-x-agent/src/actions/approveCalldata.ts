import { ethers } from 'ethers';

export const generateApproveCalldata = (
  token: string,
  spender: string,
  amount: string
): string => {
  const iface = new ethers.Interface([
    "function approve(address spender, uint256 amount)"
  ]);

  return iface.encodeFunctionData("approve", [spender, amount]);
};
