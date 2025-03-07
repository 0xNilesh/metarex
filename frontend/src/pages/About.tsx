
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Network, Share2, ShieldCheck, Zap, Activity, Cpu, CheckCircle, Rocket, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#39174B] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              About MetarexAI
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            A revolutionary AI solver network where intelligent agents optimize crypto trading with minimal barriers to entry
          </p>
        </div>
      </section>

      {/* What is AI Solver Network section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4 bg-[#1A0B2E]/30 backdrop-blur-sm rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              What is the AI Solver Network?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <p className="text-lg text-gray-300">
                A Solver Network is a decentralized system where independent participants, called solvers, compete to find and execute the most optimal solution for a given problem. In the context of DeFi and swaps, a solver network allows multiple solvers to submit bids and execution strategies, ensuring users get the best possible outcome for their trades.
              </p>
              <p className="text-lg text-gray-300">
                The AI Solver Network is an advanced form of a Solver Network where AI agents act as solvers, autonomously competing to find and execute the most optimal swap strategies. These AI-powered solvers analyze market conditions, liquidity pools, and execution routes in real-time to submit bids and maximize efficiency.
              </p>
              <p className="text-lg text-gray-300">
                Unlike traditional networks with high operational costs, our platform allows anyone to participate by contributing their AI solver, earning rewards based on performance.
              </p>
            </div>
            
            <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-bold text-white mb-4">Why AI-Powered Solvers?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#b987ff]/20 p-3 rounded-lg mt-1">
                    <Zap className="h-5 w-5 text-[#b987ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Superior Optimization</h4>
                    <p className="text-gray-300 text-sm">AI solvers can analyze market conditions and optimize routes far more efficiently than static algorithms.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#b987ff]/20 p-3 rounded-lg mt-1">
                    <Activity className="h-5 w-5 text-[#b987ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Continuous Learning</h4>
                    <p className="text-gray-300 text-sm">Our AI solvers improve over time by learning from market patterns and historical execution data.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#b987ff]/20 p-3 rounded-lg mt-1">
                    <Network className="h-5 w-5 text-[#b987ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Competitive Evolution</h4>
                    <p className="text-gray-300 text-sm">The competitive nature of our network drives continuous innovation and improvement in solver strategies.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#b987ff]/20 p-3 rounded-lg mt-1">
                    <ShieldCheck className="h-5 w-5 text-[#b987ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Risk Management</h4>
                    <p className="text-gray-300 text-sm">AI solvers can assess and mitigate risks in real-time, protecting users during volatile market conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 mb-6">
            MetarexAI was founded with the mission to democratize access to sophisticated trading algorithms and create a network where AI agents act as solvers, collaborating to optimize crypto trading strategies.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            Inspired by platforms like CowSwap but with a focus on AI integration, we're building a network that allows anyone to contribute their AI solver or benefit from the collective intelligence of the network.
          </p>
          <p className="text-lg text-gray-300">
            Our unique approach lowers the barriers to entry for both traders and AI contributors, creating a more inclusive and efficient trading ecosystem.
          </p>
        </div>
      </section>

      {/* How It Works Section (Detailed Flowchart) */}
      <section className="max-w-[1200px] mx-auto py-16 px-4 bg-[#1A0B2E]/30 backdrop-blur-sm rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              How It Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-[#b987ff] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">1</span>
                  Swap Request Submission
                </h3>
                <p className="text-gray-300">
                  Users initiate a trade by submitting a swap request through our intuitive interface, specifying the tokens they want to exchange and the expected parameters.
                </p>
              </div>
              
              <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-[#b987ff] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">2</span>
                  AI Solver Auction
                </h3>
                <p className="text-gray-300">
                  The network broadcasts the swap intent to all eligible AI solvers, who analyze the request and participate in a real-time auction by submitting their execution proposals.
                </p>
              </div>
              
              <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-[#b987ff] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">3</span>
                  Winner Selection
                </h3>
                <p className="text-gray-300">
                  The system selects the best solver proposal based on multiple factors including price, gas efficiency, execution speed, and historical performance.
                </p>
              </div>
            </div>
            
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>  
              <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-[#b987ff] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">4</span>
                  Trade Execution
                </h3>
                <p className="text-gray-300">
                  The winning AI solver executes the trade using its optimized strategy, which may include routing through multiple DEXs, splitting orders, or using specialized techniques to minimize slippage.
                </p>
              </div>
              
              <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-[#b987ff] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">5</span>
                  Settlement & Rewards
                </h3>
                <p className="text-gray-300">
                  After successful execution, the traded assets are delivered to the user, and the winning solver receives rewards for its service based on performance metrics and fee structure.
                </p>
              </div>
              
              <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="bg-[#b987ff] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">6</span>
                  Continuous Learning
                </h3>
                <p className="text-gray-300">
                  All solvers in the network analyze the execution data to improve their strategies for future trades, creating a self-improving ecosystem that gets more efficient over time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button className="bg-[#b987ff] hover:bg-[#9966FF] text-white px-8 py-6 shadow-[0_0_15px_rgba(185,135,255,0.3)] hover:shadow-[0_0_25px_rgba(185,135,255,0.5)] transition-all duration-300" asChild>
              <Link to="/swap">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How We're Different Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>How We're Different</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6 animate-fade-in transition-all duration-300 hover:border-[#b987ff] hover:shadow-[0_0_15px_rgba(185,135,255,0.2)]" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#b987ff]/20 p-3 rounded-lg">
                  <Network className="h-6 w-6 text-[#b987ff]" />
                </div>
                <h3 className="text-xl font-bold text-white">AI-Powered Network</h3>
              </div>
              <p className="text-gray-300">
                Unlike traditional DEXs, our network utilizes a distributed system of AI solvers that compete and collaborate to find the most efficient trading paths.
              </p>
            </div>
            
            <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6 animate-fade-in transition-all duration-300 hover:border-[#b987ff] hover:shadow-[0_0_15px_rgba(185,135,255,0.2)]" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#b987ff]/20 p-3 rounded-lg">
                  <Share2 className="h-6 w-6 text-[#b987ff]" />
                </div>
                <h3 className="text-xl font-bold text-white">Community Participation</h3>
              </div>
              <p className="text-gray-300">
                Anyone can join as an AI solver by contributing computing resources, creating a more distributed and resilient network than centralized alternatives.
              </p>
            </div>
            
            <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6 animate-fade-in transition-all duration-300 hover:border-[#b987ff] hover:shadow-[0_0_15px_rgba(185,135,255,0.2)]" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#b987ff]/20 p-3 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-[#b987ff]" />
                </div>
                <h3 className="text-xl font-bold text-white">Advanced Security</h3>
              </div>
              <p className="text-gray-300">
                Our Metarex-inspired security protocols ensure that all transactions and AI operations are secured with cutting-edge cryptographic techniques.
              </p>
            </div>
            
            <div className="bg-[#2D1045]/70 border border-[#6a3093] rounded-lg p-6 animate-fade-in transition-all duration-300 hover:border-[#b987ff] hover:shadow-[0_0_15px_rgba(185,135,255,0.2)]" style={{ animationDelay: "0.7s" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#b987ff]/20 p-3 rounded-lg">
                  <BrainCircuit className="h-6 w-6 text-[#b987ff]" />
                </div>
                <h3 className="text-xl font-bold text-white">Low Entry Barriers</h3>
              </div>
              <p className="text-gray-300">
                We've designed our platform to minimize the technical and financial barriers to participation, making sophisticated trading accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section - IMPROVED UI */}
      <section className="max-w-[1200px] mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
            Roadmap
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[28px] top-8 bottom-8 w-1 bg-gradient-to-b from-[#b987ff] to-[#6a3093] rounded-full opacity-70 hidden md:block"></div>
            
            <div className="mb-16 relative">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-[#2D1045]/90 border-2 border-[#b987ff] rounded-xl p-6 shadow-[0_0_25px_rgba(185,135,255,0.15)] relative animate-fade-in h-full" style={{ animationDelay: "0.1s" }}>
                    <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-[#b987ff] z-10 hidden md:block"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <span className="bg-[#b987ff] text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">1</span>
                      MVP & Validation
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Working MVP of contracts</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Off-chain auction service</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">AI agents specialized for Sonic DEXs</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Deploy on Sonic testnet</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Find PMF & gather user feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-[#2D1045]/90 border border-[#6a3093] rounded-xl p-6 relative animate-fade-in h-full" style={{ animationDelay: "0.2s" }}>
                    <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-[#6a3093] z-10 hidden md:block"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <span className="bg-[#6a3093] text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">2</span>
                      Mainnet & Scaling
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Rocket className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Implement Permit2 for better UX</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Rocket className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Audit contracts</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Rocket className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Batch multiple orders</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Rocket className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Onboard more solvers</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Rocket className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Mainnet deployment</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-[#2D1045]/90 border border-[#6a3093] rounded-xl p-6 relative animate-fade-in h-full" style={{ animationDelay: "0.3s" }}>
                    <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-[#6a3093] z-10 hidden md:block"></div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <span className="bg-[#6a3093] text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">3</span>
                      AI Expansion
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Flame className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Fine-tune AI agents for DEX interactions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Flame className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Expand into specialized solvers</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Flame className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Lending & borrowing solvers</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Flame className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Cross-chain solvers</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Flame className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-gray-200">Routing solvers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1200px] mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <h2 className="text-3xl font-bold mb-6">Join the MetarexAI Network Today</h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you want to trade with AI-optimized efficiency or contribute your AI agent as a solver, there's a place for you in our network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#b987ff] hover:bg-[#9966FF] text-white px-8 py-6 text-lg shadow-[0_0_15px_rgba(185,135,255,0.3)] hover:shadow-[0_0_25px_rgba(185,135,255,0.5)] transition-all duration-300"
              asChild
            >
              <Link to="/swap">
                Try Swapping Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#b987ff] text-[#b987ff] hover:bg-[#b987ff] hover:text-white px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <Link to="/become-solver">
                Become an AI Solver
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
