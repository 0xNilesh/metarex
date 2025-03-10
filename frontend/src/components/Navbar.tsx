import React from "react";
import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@/styles/rainbowkit.css";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-[1200px] mx-auto py-4 px-4 flex justify-between items-center animate-fade-in">
      <div className="flex items-center gap-2">
        <BrainCircuit className="h-8 w-8 text-[#b987ff]" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
          MetarexAI
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="text-violet-300 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-300 hover:text-white transition-colors"
        >
          About
        </Link>
        <Link
          to="/swap"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Swap
        </Link>
        <Link
          to="/become-solver"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Become a Solver
        </Link>
        <div className="rainbow-kit-connect">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div style={{ position: 'relative', zIndex: 50 }}>
                  <Button
                    variant="outline"
                    className="border-[#b987ff] text-[#b987ff] hover:bg-[#b987ff] hover:text-white"
                    onClick={connected ? openAccountModal : openConnectModal}
                  >
                    {connected ? account.displayName : "Connect Wallet"}
                  </Button>
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
