"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, Building2, TrendingUp, Users, PlusCircle, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSigner } from "@/lib/web3";
import { FACTORY_ADDRESS, USDC_ADDRESS, FACTORY_ABI, PROPERTY_ABI, USDC_ABI } from "@/lib/contracts";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function TokenizationDashboard() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const [propertyAddress, setPropertyAddress] = useState<string>("");
  
  // UI States
  const [isConnecting, setIsConnecting] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  // App Data State
  const [propertyCreated, setPropertyCreated] = useState(false);
  const [totalContribution, setTotalContribution] = useState("0");
  const [totalProfit, setTotalProfit] = useState("0");
  
  // User specific
  const [depositAmount, setDepositAmount] = useState("");
  const [userContribution, setUserContribution] = useState("0");
  const [userShare, setUserShare] = useState("0");
  const [userBalance, setUserBalance] = useState(10000); // Mock starting USDC balance for demo UI
  
  // Admin specific
  const [profitAmount, setProfitAmount] = useState("");

  // Result specific
  const [profitReceived, setProfitReceived] = useState<number | null>(null);

  // Mock investors list (We keep this mock visual for demo cap table if no real events are fetched)
  const [investors, setInvestors] = useState([
    { address: "0x8922...f4a1", contribution: "2000", share: "100" }
  ]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setMessage(null);
    try {
      let ethProvider: any = window.ethereum;
      
      // Handle multiple wallets (Phantom hijacks window.ethereum by default)
      if (window.ethereum && window.ethereum.providers) {
        ethProvider = window.ethereum.providers.find((p: any) => p.isMetaMask && !p.isPhantom) || ethProvider;
      }

      if (!ethProvider) throw new Error("MetaMask not found");
      
      // Force Sepolia Network (Chain ID: 11155111 = 0xaa36a7)
      try {
        await ethProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        });
      } catch (switchError: any) {
        // If the network is not added to MetaMask, ask to add it
        if (switchError.code === 4902) {
          try {
            await ethProvider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xaa36a7',
                  chainName: 'Sepolia',
                  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
                  rpcUrls: ['https://rpc.sepolia.org'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io'],
                },
              ],
            });
          } catch (addError) {
            throw new Error("Failed to add Sepolia network to MetaMask");
          }
        } else {
          throw new Error("Please switch to the Sepolia network in MetaMask");
        }
      }
      
      // Request fresh permissions to force account selector dialog
      try {
        await ethProvider.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (permError: any) {
        // If wallet_requestPermissions is not supported, fall back to eth_requestAccounts
        if (permError.code !== 4001) { 
          console.log("wallet_requestPermissions not supported, using eth_requestAccounts");
        } else {
          throw permError;
        }
      }
      
      // Now get accounts
      const accounts = await ethProvider.request({ 
        method: "eth_requestAccounts" 
      });
      
      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(ethProvider);
        const _signer = await provider.getSigner();
        const _address = await _signer.getAddress();
        
        setSigner(_signer);
        setAddress(_address);
        setIsAdmin(true);
        
        setMessage({text: "Wallet connected successfully!", type: "success"});
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 4001) {
        setMessage({text: "Connection request cancelled.", type: "error"});
      } else {
        setMessage({text: "Failed to connect wallet.", type: "error"});
      }
    }
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setSigner(null);
    setAddress("");
    setIsAdmin(false);
    setPropertyAddress("");
    setPropertyCreated(false);
    setMessage({text: "Wallet disconnected", type: "success"});
  };

  const handleCreateProperty = async () => {
    if (!signer) return;
    setLoadingAction("Creating Property...");
    try {
      const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
      const tx = await factory.createProperty(USDC_ADDRESS);
      await tx.wait();
      
      // Fetch the created property (assuming the last one in the array is ours for demo)
      const properties = await factory.getProperties();
      if (properties.length > 0) {
        setPropertyAddress(properties[properties.length - 1]);
      } else {
        // Fallback mock address if getProperties is empty/not working yet
        setPropertyAddress("0xDemoPropertyAddress12345");
      }
      
      setPropertyCreated(true);
      setTotalContribution("2000"); // initial seed for visual demo
      setMessage({text: "Property created successfully!", type: "success"});
    } catch (e) {
      console.error(e);
      setMessage({text: "Transaction failed.", type: "error"});
    }
    setLoadingAction(null);
  };

  const handleDeposit = async () => {
    if (!signer || !depositAmount || !propertyAddress) return;
    setLoadingAction("Depositing USDC...");
    try {
      const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
      const property = new ethers.Contract(propertyAddress, PROPERTY_ABI, signer);
      const value = ethers.parseUnits(depositAmount, 6);
      
      const approveTx = await usdc.approve(propertyAddress, value);
      await approveTx.wait();
      
      const tx = await property.deposit(value);
      await tx.wait();
      
      // Update local state visually for the demo
      const depAmt = parseInt(depositAmount);
      const newContrib = parseInt(userContribution) + depAmt;
      const newTotal = parseInt(totalContribution) + depAmt;
      
      setUserContribution(newContrib.toString());
      setTotalContribution(newTotal.toString());
      setUserBalance(prev => prev - depAmt);
      
      const newShare = ((newContrib / newTotal) * 100).toFixed(2);
      setUserShare(newShare);
      
      setMessage({text: `Successfully deposited ${depositAmount} USDC!`, type: "success"});
      setDepositAmount("");
      
      const shortAddr = address.substring(0,6) + "..." + address.substring(38);
      setInvestors(prev => {
        const otherInvestors = prev.filter(i => i.address !== shortAddr);
        const updatedOthers = otherInvestors.map(i => ({
           ...i,
           share: ((parseInt(i.contribution) / newTotal) * 100).toFixed(2)
        }));
        return [
          { address: shortAddr, contribution: newContrib.toString(), share: newShare },
          ...updatedOthers
        ];
      });
    } catch (e) {
      console.error(e);
      setMessage({text: "Deposit failed. Check console.", type: "error"});
    }
    setLoadingAction(null);
  };

  const handleAddProfit = async () => {
    if (!signer || !profitAmount || !propertyAddress) return;
    setLoadingAction("Adding Profit...");
    try {
      const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
      const property = new ethers.Contract(propertyAddress, PROPERTY_ABI, signer);
      const value = ethers.parseUnits(profitAmount, 6);
      
      const approveTx = await usdc.approve(propertyAddress, value);
      await approveTx.wait();
      
      const tx = await property.depositProfit(value);
      await tx.wait();
      
      setTotalProfit((parseInt(totalProfit) + parseInt(profitAmount)).toString());
      setMessage({text: `Added ${profitAmount} USDC to profit pool!`, type: "success"});
      setProfitAmount("");
    } catch (e) {
      console.error(e);
      setMessage({text: "Failed to add profit. Check console.", type: "error"});
    }
    setLoadingAction(null);
  };

  const handleDistribute = async () => {
    if (!signer || !propertyAddress) return;
    setLoadingAction("Distributing Profit...");
    try {
      const property = new ethers.Contract(propertyAddress, PROPERTY_ABI, signer);
      const tx = await property.distribute();
      await tx.wait();
      
      const shareReceived = (parseFloat(userShare) / 100) * parseInt(totalProfit);
      setUserBalance(prev => prev + shareReceived);
      setProfitReceived(shareReceived);
      
      setMessage({text: `Profit distributed successfully!`, type: "success"});
      setTotalProfit("0");
    } catch (e) {
      console.error(e);
      setMessage({text: "Distribution failed. Check console.", type: "error"});
    }
    setLoadingAction(null);
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else if (accounts[0] !== address) {
      // Account was switched, update state
      try {
        let ethProvider: any = window.ethereum;
        if (window.ethereum && window.ethereum.providers) {
          ethProvider = window.ethereum.providers.find((p: any) => p.isMetaMask && !p.isPhantom) || ethProvider;
        }

        const provider = new ethers.BrowserProvider(ethProvider!);
        const _signer = await provider.getSigner();
        const _address = await _signer.getAddress();
        
        setSigner(_signer);
        setAddress(_address);
        setMessage({text: `Switched to ${_address}`, type: "success"});
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [address]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 border-b border-zinc-800/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 tracking-tight">
              CBD Property Tokenization
            </h1>
          </div>
          
          <button
            onClick={address ? disconnectWallet : connectWallet}
            disabled={isConnecting}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              address 
                ? 'bg-zinc-800/50 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-red-400' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]'
            }`}
          >
            {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
            {address ? `Disconnect (${address.substring(0, 6)}...${address.substring(38)})` : 'Connect Wallet'}
          </button>
        </header>

        {/* Notifications */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md border shadow-2xl ${
                message.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-medium">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Property Panel */}
            <Card>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-400" />
                    Asset Details
                  </h2>
                  <p className="text-zinc-400 text-sm">Miami Luxury Condo Complex - 1204</p>
                </div>
                {isAdmin && !propertyCreated && (
                  <button 
                    onClick={handleCreateProperty}
                    disabled={!!loadingAction}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-zinc-700"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Property
                  </button>
                )}
                {propertyCreated && (
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live on Chain
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 p-6 rounded-xl border border-zinc-800/50">
                  <div className="text-zinc-500 text-sm mb-1 font-medium">Total Contribution</div>
                  <div className="text-3xl font-bold font-mono tracking-tight text-indigo-400">
                    ${Number(totalContribution).toLocaleString()} <span className="text-sm text-zinc-500 font-sans">USDC</span>
                  </div>
                </div>
                <div className="bg-black/50 p-6 rounded-xl border border-zinc-800/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="text-zinc-500 text-sm mb-1 font-medium">Current Profit Pool</div>
                  <div className="text-3xl font-bold font-mono tracking-tight text-emerald-400">
                    ${Number(totalProfit).toLocaleString()} <span className="text-sm text-zinc-500 font-sans">USDC</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Investor List */}
            {propertyCreated && (
              <Card>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  On-Chain Cap Table
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 text-sm">
                        <th className="pb-4 font-medium">Wallet Address</th>
                        <th className="pb-4 font-medium text-right">Contribution (USDC)</th>
                        <th className="pb-4 font-medium text-right">Ownership Share</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <AnimatePresence>
                        {investors.map((inv, idx) => (
                          <motion.tr 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={idx} 
                            className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20 transition-colors"
                          >
                            <td className="py-4 font-mono text-zinc-300">{inv.address}</td>
                            <td className="py-4 font-mono text-right">${Number(inv.contribution).toLocaleString()}</td>
                            <td className="py-4 text-right">
                              <span className="bg-zinc-800 px-2 py-1 rounded text-indigo-300 font-medium">{inv.share}%</span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Result Panel */}
            {(profitReceived !== null || !!address) && (
              <Card className="bg-gradient-to-br from-zinc-900 to-indigo-900/10 border-indigo-500/20">
                <h2 className="text-xl font-semibold mb-6">Your Wallet Summary</h2>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 bg-black/40 p-4 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-xs mb-1">Your Balance</div>
                    <div className="text-xl font-mono">${userBalance.toLocaleString()}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-600" />
                  <div className="flex-1 bg-black/40 p-4 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-xs mb-1">Your Share</div>
                    <div className="text-xl font-mono text-indigo-400">{userShare}%</div>
                  </div>
                  {profitReceived !== null && (
                    <>
                      <ArrowRight className="w-5 h-5 text-emerald-500" />
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-1 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30"
                      >
                        <div className="text-emerald-500/80 text-xs mb-1">Profit Received</div>
                        <div className="text-xl font-mono text-emerald-400">+${profitReceived.toLocaleString()}</div>
                      </motion.div>
                    </>
                  )}
                </div>
              </Card>
            )}

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* User Investment Panel */}
            <Card className="border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
                <Wallet className="w-24 h-24 text-indigo-400 rotate-12" />
              </div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 relative z-10">
                Investment Portal
              </h2>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Amount to Deposit</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      disabled={!propertyCreated || !address}
                      className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">USDC</div>
                  </div>
                </div>
                
                <button
                  onClick={handleDeposit}
                  disabled={!depositAmount || !!loadingAction || !propertyCreated || !address}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loadingAction === "Depositing USDC..." ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  Deposit USDC
                </button>
                
                <div className="pt-4 mt-4 border-t border-zinc-800/50 flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Your Contribution</span>
                  <span className="font-mono text-zinc-300">${Number(userContribution).toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Admin Panel */}
            {isAdmin && (
              <Card className="border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                  Admin Controls
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Yield Generation</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="number"
                          value={profitAmount}
                          onChange={(e) => setProfitAmount(e.target.value)}
                          placeholder="0.00"
                          disabled={!propertyCreated}
                          className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-medium">USDC</div>
                      </div>
                      <button
                        onClick={handleAddProfit}
                        disabled={!profitAmount || !!loadingAction || !propertyCreated}
                        className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                      >
                        {loadingAction === "Adding Profit..." ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Add Profit
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-zinc-800/50">
                    <button
                      onClick={handleDistribute}
                      disabled={Number(totalProfit) <= 0 || !!loadingAction || !propertyCreated}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                      {loadingAction === "Distributing Profit..." ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                      Distribute Profit Automatically
                    </button>
                    <p className="text-center text-xs text-zinc-500 mt-3">Smart contract splits based on ownership %</p>
                  </div>
                </div>
              </Card>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
