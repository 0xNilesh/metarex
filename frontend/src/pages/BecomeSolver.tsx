import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, BrainCircuit, Network, Award, Coins, BadgeCheck, ShieldCheck, Triangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAccount, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { useToast } from "@/hooks/use-toast";
import { sonic } from "viem/chains";
import { CONTRACTS } from "@/config/constants";

const solverRegistryAddress = CONTRACTS.solverRegistry;
const minDeposit = parseUnits("0.1", 18); // 0.1 S token

const BecomeSolver = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const { writeContract, isPending } = useWriteContract();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegisterSolver = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to register as a solver",
        variant: "destructive"
      });
      return;
    }

    try {
      const tx = await writeContract({
        address: solverRegistryAddress,
        abi: [
          {
            "name": "registerSolver",
            "type": "function",
            "stateMutability": "payable",
            "inputs": [],
            "outputs": []
          }
        ],
        functionName: "registerSolver",
        args: [],
        value: minDeposit,
        chain: sonic, // Add the appropriate chain ID
        account: address,
      });
      console.log("Transaction sent:", tx);
    } catch (error) {
      console.error("Error executing transaction:", error);
      toast({
        title: "Transaction failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#39174B] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              Become a Solver
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Join the MetarexAI network and earn rewards by contributing your AI solver to optimize trades
          </p>
        </div>
      </section>

      {/* Why Become a Solver Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
            Why Become a Solver?
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-[#1A0B2E]/80 border-[#6a3093] backdrop-blur-sm hover:border-[#b987ff] transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <Coins className="h-10 w-10 text-[#b987ff] mb-2" />
              <CardTitle className="text-white">Earn Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Solvers earn a share of transaction fees for each successful trade execution. The more efficient your solver, the more rewards you'll receive.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A0B2E]/80 border-[#6a3093] backdrop-blur-sm hover:border-[#b987ff] transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <BrainCircuit className="h-10 w-10 text-[#b987ff] mb-2" />
              <CardTitle className="text-white">Low Barrier to Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Unlike traditional solver networks with high operational costs, MetarexAI makes it easy for anyone to participate by bringing their AI solver to the network.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A0B2E]/80 border-[#6a3093] backdrop-blur-sm hover:border-[#b987ff] transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <Award className="h-10 w-10 text-[#b987ff] mb-2" />
              <CardTitle className="text-white">Gain Reputation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Build your reputation on the solver leaderboard. Top-performing solvers receive additional incentives and recognition within the community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Solver Participation Agreement */}
        <div className="max-w-3xl mx-auto bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-8 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-2xl font-bold text-white mb-6">Solver Participation Agreement</h3>
          
          <div className="space-y-6 text-gray-300 mb-8">
            <p>To become a solver on the AI Solver Network, you must agree to the following:</p>
            
            <div className="pl-6 space-y-4">
              <div className="flex items-start gap-3">
                <Triangle className="h-4 w-4 text-[#b987ff] mt-1 shrink-0" />
                <p>Fair Competition: Solvers must submit valid and optimized strategies.</p>
              </div>
              <div className="flex items-start gap-3">
                <Triangle className="h-4 w-4 text-[#b987ff] mt-1 shrink-0" />
                <p>Execution Integrity: Transactions must match the approved strategy to avoid penalties.</p>
              </div>
              <div className="flex items-start gap-3">
                <Triangle className="h-4 w-4 text-[#b987ff] mt-1 shrink-0" />
                <p>Slashing & Penalties: Incorrect or malicious execution may result in deposit slashing.</p>
              </div>
              <div className="flex items-start gap-3">
                <Triangle className="h-4 w-4 text-[#b987ff] mt-1 shrink-0" />
                <p>Rewards & Incentives: Solvers earn fees for successful execution and may receive additional incentives.</p>
              </div>
              <div className="flex items-start gap-3">
                <Triangle className="h-4 w-4 text-[#b987ff] mt-1 shrink-0" />
                <p>Compliance: Solvers must adhere to network rules and applicable regulations.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pt-4">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="border-[#b987ff] data-[state=checked]:bg-[#b987ff] data-[state=checked]:text-white"
              />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                By clicking "Agree & Become a Solver", you confirm that you have read and accepted the terms of participation.
              </label>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#b987ff] hover:bg-[#9966FF] text-white py-6 shadow-[0_0_15px_rgba(185,135,255,0.3)] hover:shadow-[0_0_25px_rgba(185,135,255,0.5)] transition-all duration-300"
            disabled={!agreedToTerms}
            onClick={handleRegisterSolver}
          >
            {isPending ? "Registering..." : "Agree & Become a Solver"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>Solver Leaderboard</h3>
          
          <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-[#6a3093] bg-[#1A0B2E]/80 text-violet-300">
              <div className="font-semibold">Rank</div>
              <div className="font-semibold">Solver</div>
              <div className="font-semibold">Trades Executed</div>
              <div className="font-semibold">Success Rate</div>
              <div className="font-semibold">Rewards Earned</div>
            </div>
            
            {[
              { rank: 1, name: "MetarexPrime", trades: 15782, successRate: "99.7%", rewards: "24,560 MTX" },
              { rank: 2, name: "NeuralSwap", trades: 12453, successRate: "99.3%", rewards: "19,872 MTX" },
              { rank: 3, name: "OptimaTrade", trades: 10921, successRate: "98.9%", rewards: "17,405 MTX" },
              { rank: 4, name: "QuantumSolve", trades: 9876, successRate: "98.6%", rewards: "15,243 MTX" },
              { rank: 5, name: "AlphaNode", trades: 8765, successRate: "98.2%", rewards: "13,982 MTX" },
            ].map((solver, index) => (
              <div key={index} className={`grid grid-cols-5 gap-4 p-4 ${index % 2 === 0 ? 'bg-[#2D1045]/40' : 'bg-[#2D1045]/20'}`}>
                <div className="flex items-center">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${solver.rank === 1 ? 'bg-yellow-500' : solver.rank === 2 ? 'bg-gray-300' : solver.rank === 3 ? 'bg-amber-600' : 'bg-[#6a3093]'}`}>
                    {solver.rank}
                  </span>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className={`h-4 w-4 mr-2 ${solver.rank <= 3 ? 'text-[#b987ff]' : 'text-gray-400'}`} />
                  {solver.name}
                </div>
                <div>{solver.trades.toLocaleString()}</div>
                <div>{solver.successRate}</div>
                <div>{solver.rewards}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BecomeSolver;
