import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserBalance, TradeOrder } from '../types/crypto';

interface WalletContextType {
  balance: UserBalance;
  orders: TradeOrder[];
  executeTrade: (order: Omit<TradeOrder, 'timestamp'>) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<UserBalance>(() => {
    const stored = localStorage.getItem('wallet');
    return stored ? JSON.parse(stored) : {
      usd: 10000, // Starting with $10,000 USD
      crypto: {},
    };
  });

  const [orders, setOrders] = useState<TradeOrder[]>([]);

  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(balance));
  }, [balance]);

  const executeTrade = (order: Omit<TradeOrder, 'timestamp'>): boolean => {
    const total = order.amount * order.price;

    if (order.type === 'buy') {
      if (balance.usd < total) {
        alert('Insufficient USD balance');
        return false;
      }

      setBalance(prev => ({
        usd: prev.usd - total,
        crypto: {
          ...prev.crypto,
          [order.cryptoId]: (prev.crypto[order.cryptoId] || 0) + order.amount,
        },
      }));
    } else {
      const currentCryptoAmount = balance.crypto[order.cryptoId] || 0;
      if (currentCryptoAmount < order.amount) {
        alert(`Insufficient ${order.cryptoId.toUpperCase()} balance`);
        return false;
      }

      setBalance(prev => ({
        usd: prev.usd + total,
        crypto: {
          ...prev.crypto,
          [order.cryptoId]: currentCryptoAmount - order.amount,
        },
      }));
    }

    const newOrder: TradeOrder = {
      ...order,
      timestamp: Date.now(),
    };

    setOrders(prev => [newOrder, ...prev]);
    return true;
  };

  return (
    <WalletContext.Provider value={{ balance, orders, executeTrade }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};