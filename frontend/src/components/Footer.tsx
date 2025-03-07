import React from "react";
import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#6a3093] mt-20">
      <div className="max-w-[1200px] mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-[#b987ff]" />
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              MetarexAI
            </span>
          </div>
          <div className="flex gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
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
          </div>
          <p className="text-gray-400 text-sm">
            © 2023 MetarexAI Solver Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
