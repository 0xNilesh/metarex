export const erc20ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];

export const swapExecutorABI = [
  {
    "name": "createOrder",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "sourceToken", "type": "address" },
      { "name": "sourceAmount", "type": "uint256" },
      { "name": "targetToken", "type": "address" },
      { "name": "minTargetAmount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }]
  }
];
