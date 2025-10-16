'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authenticate, isSignedIn } from '@/lib/stacksAuth';
import { connectMetaMask, isMetaMaskConnected, isMetaMaskInstalled } from '@/lib/metamaskAuth';

export default function WalletLogin() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnectingMetaMask, setIsConnectingMetaMask] = useState(false);
  const [metamaskError, setMetamaskError] = useState<string>('');

  useEffect(() => {
    if (isSignedIn() || isMetaMaskConnected()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleConnect = () => {
    setIsConnecting(true);
    authenticate();
  };

  const handleMetaMaskConnect = async () => {
    setIsConnectingMetaMask(true);
    setMetamaskError('');

    if (!isMetaMaskInstalled()) {
      setMetamaskError('Please install MetaMask extension first');
      setIsConnectingMetaMask(false);
      return;
    }

    try {
      await connectMetaMask();
      router.push('/dashboard');
    } catch (error: any) {
      setMetamaskError(error.message || 'Failed to connect MetaMask');
      setIsConnectingMetaMask(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center max-w-4xl w-full">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-7xl md:text-8xl font-bold text-yellow-400 mb-6 tracking-tight">
            Stockify
          </h1>
          <p className="text-white text-xl md:text-2xl font-light">
            Bitcoin-Native Tokenized US Stocks on Stacks
          </p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4 mb-12">
          {/* Stacks Wallets Button */}
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-16 py-6 rounded-lg transition-all shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md mx-auto block"
          >
            {isConnecting ? 'Connecting...' : 'Connect Stacks Wallet'}
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* MetaMask Button */}
          <button
            onClick={handleMetaMaskConnect}
            disabled={isConnectingMetaMask}
            className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 font-bold text-xl px-16 py-6 rounded-lg transition-all border-2 border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md mx-auto block flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🦊</span>
            {isConnectingMetaMask ? 'Connecting...' : 'Connect MetaMask'}
          </button>

          {/* MetaMask Error */}
          {metamaskError && (
            <p className="text-red-400 text-sm mt-2 max-w-md mx-auto">
              {metamaskError}
            </p>
          )}
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Stock Trading */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-yellow-400/50 transition-all">
            <div className="text-yellow-400 text-4xl mb-4">📈</div>
            <h3 className="text-white text-xl font-semibold mb-3">Stock Trading</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Buy and sell tokenized US stocks with Bitcoin collateral
            </p>
          </div>

          {/* Blockchain Security */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-yellow-400/50 transition-all">
            <div className="text-yellow-400 text-4xl mb-4">🛡️</div>
            <h3 className="text-white text-xl font-semibold mb-3">Blockchain Security</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              All transactions secured on the Stacks blockchain
            </p>
          </div>

          {/* AI-Powered Agent */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-yellow-400/50 transition-all">
            <div className="text-yellow-400 text-4xl mb-4">⚡</div>
            <h3 className="text-white text-xl font-semibold mb-3">AI-Powered Agent</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Trade using natural language commands with our AI agent
            </p>
          </div>

          {/* Wallet Integration */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-yellow-400/50 transition-all">
            <div className="text-yellow-400 text-4xl mb-4">💳</div>
            <h3 className="text-white text-xl font-semibold mb-3">Wallet Integration</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect Hiro, Leather, Xverse, or MetaMask wallets seamlessly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
