import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { useWallet } from '../context/WalletContext';

interface TradeFormProps {
  cryptoId: string;
  symbol: string;
  currentPrice: number;
}

export const TradeForm: React.FC<TradeFormProps> = ({
  cryptoId,
  symbol,
  currentPrice,
}) => {
  const { balance, executeTrade } = useWallet();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const order = {
      type: tradeType,
      cryptoId,
      amount: numAmount,
      price: currentPrice,
      total: numAmount * currentPrice,
    };

    if (executeTrade(order)) {
      setAmount('');
    }
  };

  const maxAmount = tradeType === 'buy'
    ? balance.usd / currentPrice
    : balance.crypto[cryptoId] || 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Trade {symbol.toUpperCase()}</h3>
      
      <div className="flex space-x-2 mb-4">
        <Button
          type="button"
          variant={tradeType === 'buy' ? 'primary' : 'secondary'}
          onClick={() => setTradeType('buy')}
          className="flex-1"
        >
          Buy
        </Button>
        <Button
          type="button"
          variant={tradeType === 'sell' ? 'primary' : 'secondary'}
          onClick={() => setTradeType('sell')}
          className="flex-1"
        >
          Sell
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="any"
          required
        />
        
        <div className="text-sm text-gray-600">
          <p>Price: ${currentPrice.toLocaleString()}</p>
          <p>Total: ${(parseFloat(amount) || 0 * currentPrice).toLocaleString()}</p>
          <p>Max: {maxAmount.toFixed(8)} {symbol.toUpperCase()}</p>
        </div>

        <Button type="submit" className="w-full">
          {tradeType === 'buy' ? 'Buy' : 'Sell'} {symbol.toUpperCase()}
        </Button>
      </div>
    </form>
  );
};