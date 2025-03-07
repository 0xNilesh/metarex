
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BrainCircuit, Network as NetworkIcon, Activity, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Network = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D233B] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
              The MetarexAI Network
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            A decentralized network of AI solvers optimizing crypto trades with unprecedented efficiency
          </p>
        </div>
      </section>

      {/* Network Stats Section */}
      <section className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Total AI Solvers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">1,428</span>
                <Activity className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Active growth</span>
                  <span className="text-green-400">+12%</span>
                </div>
                <Progress value={72} className="h-1 bg-[#2D233B]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Network Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">94.3%</span>
                <Zap className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Weekly average</span>
                  <span className="text-green-400">+1.2%</span>
                </div>
                <Progress value={94} className="h-1 bg-[#2D233B]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Total Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">$14.2M</span>
                <NetworkIcon className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">24h change</span>
                  <span className="text-green-400">+8.7%</span>
                </div>
                <Progress value={65} className="h-1 bg-[#2D233B]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300 text-sm font-normal">Processing Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">8.4 PF</span>
                <Cpu className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Capacity</span>
                  <span className="text-[#9b87f5]">68%</span>
                </div>
                <Progress value={68} className="h-1 bg-[#2D233B]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="container mx-auto py-10">
        <Card className="bg-[#1A1F2C]/50 border-[#6E59A5] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">Network Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full relative bg-[#0F131D] rounded-lg border border-[#6E59A5] overflow-hidden">
              {/* Simulated network visualization */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#9b87f5] rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-[#D6BCFA] rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#8B5CF6] rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#9b87f5] rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 left-3/4 w-3 h-3 bg-[#D6BCFA] rounded-full animate-pulse"></div>
                
                {/* Lines between nodes */}
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="33%" y1="75%" x2="50%" y2="50%" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="67%" y1="33%" x2="50%" y2="50%" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="75%" y1="67%" x2="50%" y2="50%" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
                </svg>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1F2C]/80 backdrop-blur-sm p-4 rounded-lg border border-[#6E59A5]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#9b87f5] font-medium">Live Transactions</p>
                    <p className="text-2xl font-bold text-white">286</p>
                  </div>
                  <div>
                    <p className="text-[#9b87f5] font-medium">Response Time</p>
                    <p className="text-2xl font-bold text-white">42ms</p>
                  </div>
                  <div>
                    <p className="text-[#9b87f5] font-medium">Active Solvers</p>
                    <p className="text-2xl font-bold text-white">843</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Join as Solver */}
      <section className="container mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#1A1F2C] to-[#2D233B] p-8 rounded-xl border border-[#6E59A5]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
                  Become an AI Solver
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Join the network as an AI solver and earn rewards by contributing to the ecosystem
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-[#6E59A5]/50">
                <h3 className="text-xl font-bold text-white mb-3">Minimal Requirements</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Modern GPU or CPU</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Stable internet connection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>MetarexAI solver software</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-[#6E59A5]/50">
                <h3 className="text-xl font-bold text-white mb-3">Setup Process</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Download our solver client</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Connect your wallet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Configure solver parameters</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-[#6E59A5]/50">
                <h3 className="text-xl font-bold text-white mb-3">Rewards</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Transaction fee shares</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Network participation tokens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#9b87f5]"></div>
                    <span>Performance-based bonuses</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white px-8 py-6 text-lg">
                Download Solver Client
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Network;
