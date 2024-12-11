import React, { useState } from 'react';
import { Eye, EyeOff, Wallet as WalletIcon } from 'lucide-react';
import { Button } from '../components/Button';

export const Wallet: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  const wallet = {
    totalBalance: 15789.42,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, value: 32716.05 },
      { symbol: 'ETH', name: 'Ethereum', amount: 2.3, value: 7949.59 },
      { symbol: 'ADA', name: 'Cardano', amount: 1000, value: 1230.00 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <WalletIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold">My Wallet</h1>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center space-x-2"
            >
              {showBalance ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Hide Balance</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Show Balance</span>
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-80 mb-2">Total Balance</p>
            <h2 className="text-3xl font-bold">
              {showBalance ? `$${wallet.totalBalance.toLocaleString()}` : '****'}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Assets</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">Asset</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {wallet.assets.map((asset) => (
                    <tr key={asset.symbol} className="border-t">
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="font-medium">{asset.name}</span>
                          <span className="ml-2 text-gray-500">{asset.symbol}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        {showBalance ? asset.amount : '****'}
                      </td>
                      <td className="py-4">
                        {showBalance ? `$${asset.value.toLocaleString()}` : '****'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};