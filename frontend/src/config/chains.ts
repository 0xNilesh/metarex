import { defineChain } from "viem";

export const sonicChain = defineChain({
  id: 146, // Replace with actual Sonic Chain ID
  name: "Sonic Mainnet",
  network: "sonic",
  nativeCurrency: {
    name: "S",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.soniclabs.com"], // Replace with actual RPC
    },
    public: {
      http: ["https://sonic.drpc.org"], // Public endpoint
    },
  },
  blockExplorers: {
    default: {
      name: "SonicScan",
      url: "https://sonicscan.org/", // Replace with actual explorer
    },
  },
});
