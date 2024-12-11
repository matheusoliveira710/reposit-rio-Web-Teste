export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export interface TradeOrder {
  type: 'buy' | 'sell';
  cryptoId: string;
  amount: number;
  price: number;
  total: number;
  timestamp: number;
}

export interface UserBalance {
  usd: number;
  crypto: {
    [key: string]: number;
  };
}