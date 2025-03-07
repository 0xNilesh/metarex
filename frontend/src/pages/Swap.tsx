
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, BrainCircuit, Info, Network, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Swap = () => {
  const { toast } = useToast();
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [fromToken, setFromToken] = useState<string>("ETH");
  const [toToken, setToToken] = useState<string>("USDC");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [priceImpact, setPriceImpact] = useState<number>(0.12);
  const [solverEfficiency, setSolverEfficiency] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Token list for demonstration
  const tokens = [
    { id: "ETH", name: "Ethereum", price: 3500 },
    { id: "USDC", name: "USD Coin", price: 1 },
    { id: "BTC", name: "Bitcoin", price: 62000 },
    { id: "METAREX", name: "Metarex", price: 0.42 },
  ];

  // Calculate price based on selected tokens
  const calculatePrice = (amount: string, from: string, to: string) => {
    const fromToken = tokens.find(t => t.id === from);
    const toToken = tokens.find(t => t.id === to);
    
    if (!fromToken || !toToken || !amount || isNaN(Number(amount))) {
      return "0";
    }
    
    const result = (Number(amount) * fromToken.price / toToken.price).toFixed(6);
    return result;
  };

  const handleSwap = () => {
    if (!fromAmount || !toAmount) {
      toast({
        title: "Enter an amount",
        description: "Please enter an amount to swap",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Swap initiated",
      description: `Swapping ${fromAmount} ${fromToken} for approximately ${toAmount} ${toToken}`,
    });
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value) {
      setIsCalculating(true);
      // Simulate network delay
      setTimeout(() => {
        setToAmount(calculatePrice(value, fromToken, toToken));
        setIsCalculating(false);
      }, 800);
    } else {
      setToAmount("");
    }
  };

  const handleSwitchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Animate solver efficiency on component mount
  useEffect(() => {
    const interval = setInterval(() => {
      setSolverEfficiency(prev => {
        if (prev >= 97) {
          clearInterval(interval);
          return 97;
        }
        return prev + 1;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#39174B] text-white animate-fade-in">
      <Navbar />

      {/* Swap Section */}
      <section className="max-w-[1200px] mx-auto py-12 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b987ff] to-[#E6BCFA]">
              AI-Powered Swap
            </span>
          </h1>
          
          <Card className="border-[#6a3093] bg-[#1A0B2E]/70 backdrop-blur-lg shadow-[0_0_15px_rgba(185,135,255,0.15)] animate-scale-in">
            <CardHeader>
              <CardTitle className="text-violet-200">Swap Tokens</CardTitle>
              <CardDescription className="text-violet-400">AI agents acting as solvers optimize your trades for minimal slippage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-violet-300">From</label>
                  <span className="text-xs text-violet-400">Balance: 1.245 ETH</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                    className="flex-1 bg-[#2D1045] border-[#6a3093] text-white"
                  />
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[140px] bg-[#2D1045] border-[#6a3093]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D1045] border-[#6a3093] text-white">
                      <SelectGroup>
                        <SelectLabel>Select Token</SelectLabel>
                        {tokens.map(token => (
                          <SelectItem key={token.id} value={token.id}>
                            {token.id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Switch Button */}
              <div className="flex justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSwitchTokens}
                  className="rounded-full bg-[#2D1045] border border-[#6a3093] hover:bg-[#4D2075] transition-all duration-300 hover:scale-110"
                >
                  <ArrowDownUp className="h-5 w-5 text-violet-300" />
                </Button>
              </div>
              
              {/* To Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-violet-300">To (estimated)</label>
                  <span className="text-xs text-violet-400">Balance: 1,050 USDC</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    readOnly
                    className="flex-1 bg-[#2D1045] border-[#6a3093] text-white"
                  />
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-[140px] bg-[#2D1045] border-[#6a3093]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D1045] border-[#6a3093] text-white">
                      <SelectGroup>
                        <SelectLabel>Select Token</SelectLabel>
                        {tokens.map(token => (
                          <SelectItem key={token.id} value={token.id}>
                            {token.id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {isCalculating && (
                <div className="text-center text-violet-400 animate-pulse text-sm">
                  AI solvers calculating optimal route...
                </div>
              )}
              
              <div className="p-3 bg-[#2D1045]/50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-violet-400 flex items-center gap-1">
                    <Network className="h-3 w-3" /> AI Solver Efficiency
                  </span>
                  <span className="text-xs text-violet-300">{solverEfficiency}%</span>
                </div>
                <Progress value={solverEfficiency} className="h-1.5 bg-[#3D2055]" />
              </div>
              
              <Separator className="bg-[#6a3093]/30" />
              
              {/* Swap Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-violet-400">Rate</span>
                  <span className="text-violet-200">1 {fromToken} = {calculatePrice("1", fromToken, toToken)} {toToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-400 flex items-center gap-1">
                    Slippage Tolerance <Info className="h-3 w-3" />
                  </span>
                  <span className="text-violet-200">{slippage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-400 flex items-center gap-1">
                    Price Impact <Info className="h-3 w-3" />
                  </span>
                  <span className="text-green-400">{priceImpact}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSwap}
                disabled={!fromAmount || !toAmount || isCalculating}
                className="w-full bg-gradient-to-r from-[#6a3093] to-[#a044ff] hover:from-[#7a40a3] hover:to-[#b057ff] text-white border-0 transition-all duration-300 hover:shadow-[0_0_15px_rgba(185,135,255,0.3)]"
              >
                {isCalculating ? "Calculating..." : "Swap Tokens"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Swap;
