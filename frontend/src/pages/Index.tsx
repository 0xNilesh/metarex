
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, BrainCircuit, Network, Zap, Shield, Waves, Globe, Coins, Rocket, CheckCircle, Award, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#39174B] text-white">
      {/* Navbar */}
      <nav className="max-w-[1200px] mx-auto py-4 px-4 flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-[#b987ff]" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">MetarexAI</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-violet-300 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link to="/swap" className="text-gray-300 hover:text-white transition-colors">Swap</Link>
          <Link to="/become-solver" className="text-gray-300 hover:text-white transition-colors">Become a Solver</Link>
          <Button variant="outline" className="border-[#b987ff] text-[#b987ff] hover:bg-[#b987ff] hover:text-white">
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto py-20 px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              AI-Powered Solver Network
            </span>
            <br /> for Optimal Execution
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Decentralized solvers compete in real-time auctions to execute your swaps at the best price—efficient, fair, and open to all.
          </p>
          <div className="flex gap-4 pt-4">
            <Button className="bg-[#b987ff] hover:bg-[#9966FF] text-white px-8 py-6 shadow-[0_0_15px_rgba(185,135,255,0.3)] hover:shadow-[0_0_25px_rgba(185,135,255,0.5)] transition-all duration-300" asChild>
              <Link to="/become-solver">
                Become a Solver
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="border-[#b987ff] text-[#b987ff] hover:bg-[#b987ff] hover:text-white px-8 py-6 transition-all duration-300" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative animate-scale-in">
          <div className="absolute -z-10 w-72 h-72 bg-[#b987ff] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative z-10 border border-[#6a3093] bg-black/30 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(185,135,255,0.2)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#E6BCFA]">MetarexAI Solver</h3>
              <Network className="text-[#b987ff]" />
            </div>
            <div className="space-y-4">
              <Input placeholder="Amount to trade" className="bg-[#2D1045] border-[#6a3093]" disabled />
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Estimated return:</span>
                <span className="text-[#b987ff] font-bold">+2.34%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Network efficiency:</span>
                <span className="text-[#E6BCFA] font-bold">94%</span>
              </div>
              <Button className="w-full bg-[#b987ff] hover:bg-[#9966FF] shadow-[0_0_10px_rgba(185,135,255,0.2)] hover:shadow-[0_0_15px_rgba(185,135,255,0.4)] transition-all duration-300" asChild>
                <Link to="/swap">
                  Swap Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Panel */}
      <section className="max-w-[1200px] mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div className="bg-[#2D1045]/50 border border-[#6a3093] rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-[#E6BCFA] mb-2">48,297</h3>
            <p className="text-gray-300">Total Trades Executed</p>
          </div>
          <div className="bg-[#2D1045]/50 border border-[#6a3093] rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-[#E6BCFA] mb-2">142</h3>
            <p className="text-gray-300">Active Solvers</p>
          </div>
          <div className="bg-[#2D1045]/50 border border-[#6a3093] rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-[#E6BCFA] mb-2">$12.8M</h3>
            <p className="text-gray-300">Trading Volume</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1200px] mx-auto py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
            Why Metarex?
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#1A0B2E]/80 border-[#6a3093] backdrop-blur-sm hover:border-[#b987ff] transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <Zap className="h-10 w-10 text-[#b987ff] mb-2" />
              <CardTitle className="text-white">Lightning Fast Execution</CardTitle>
              <CardDescription className="text-gray-300">AI-powered trade execution in milliseconds</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Our network of AI solvers competes to provide the fastest and most optimal trade execution, ensuring you get the best possible price in volatile markets.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-[#b987ff] hover:text-[#E6BCFA] p-0">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1A0B2E]/80 border-[#6a3093] backdrop-blur-sm hover:border-[#b987ff] transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <BrainCircuit className="h-10 w-10 text-[#b987ff] mb-2" />
              <CardTitle className="text-white">Reduced Fragmentation</CardTitle>
              <CardDescription className="text-gray-300">Unified solver network across all intents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                MetarexAI solves the problem of fragmented solver ecosystems by providing a unified network where any application can tap into our programmable solver infrastructure.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-[#b987ff] hover:text-[#E6BCFA] p-0">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1A0B2E]/80 border-[#6a3093] backdrop-blur-sm hover:border-[#b987ff] transition-all duration-300 hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <Shield className="h-10 w-10 text-[#b987ff] mb-2" />
              <CardTitle className="text-white">Low Entry Barriers</CardTitle>
              <CardDescription className="text-gray-300">Anyone can join with their AI solver</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Unlike traditional solver networks with high operational costs, MetarexAI makes it easy for anyone to participate by bringing their AI solver and competing for rewards.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-[#b987ff] hover:text-[#E6BCFA] p-0">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-[1200px] mx-auto py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
            How It Works
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-[#1A0B2E]/80 border border-[#6a3093] rounded-lg p-6 text-center hover:border-[#b987ff] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-[#2D1045] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Rocket className="h-8 w-8 text-[#b987ff]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Submit Swap</h3>
            <p className="text-gray-300">
              Users submit their swap intents specifying the assets they want to trade.
            </p>
          </div>
          
          <div className="bg-[#1A0B2E]/80 border border-[#6a3093] rounded-lg p-6 text-center hover:border-[#b987ff] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-[#2D1045] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-[#b987ff]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Bidding</h3>
            <p className="text-gray-300">
              AI solvers compete in real-time to offer the best execution price and path.
            </p>
          </div>
          
          <div className="bg-[#1A0B2E]/80 border border-[#6a3093] rounded-lg p-6 text-center hover:border-[#b987ff] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-[#2D1045] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-[#b987ff]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Execution</h3>
            <p className="text-gray-300">
              The winning solver executes the trade with optimized routing and minimal slippage.
            </p>
          </div>
          
          <div className="bg-[#1A0B2E]/80 border border-[#6a3093] rounded-lg p-6 text-center hover:border-[#b987ff] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-[#2D1045] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[#b987ff]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">4. Rewards</h3>
            <p className="text-gray-300">
              Successful solvers earn rewards, building reputation on the leaderboard.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#6a3093] mt-20">
        <div className="max-w-[1200px] mx-auto py-10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-[#b987ff]" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">MetarexAI</span>
            </div>
            <div className="flex gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/swap" className="text-gray-300 hover:text-white transition-colors">Swap</Link>
              <Link to="/become-solver" className="text-gray-300 hover:text-white transition-colors">Become a Solver</Link>
            </div>
            <p className="text-gray-400 text-sm">© 2023 MetarexAI Solver Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
