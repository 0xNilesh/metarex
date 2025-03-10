import { WagmiProvider } from "wagmi";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Swap from "./pages/Swap";
import BecomeSolver from "./pages/BecomeSolver";
import NotFound from "./pages/NotFound";
import { sonicChain } from "./config/chains"; // Import our custom chain
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'Metarex UI',
  projectId: import.meta.env.VITE_APP_WALLETCONNECT_API_KEY,
  chains: [sonicChain],
});
const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
          {/* <ConnectButton /> */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/become-solver" element={<BecomeSolver />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
);

export default App;
