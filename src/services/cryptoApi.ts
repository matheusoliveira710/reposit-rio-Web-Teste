import axios from 'axios';
import { CryptoPrice } from '../types/crypto';
import { handleApiError } from '../utils/errorHandling';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: COINGECKO_API,
  timeout: 10000,
});

export const getCryptoPrices = async (ids: string[]): Promise<CryptoPrice[]> => {
  try {
    const { data } = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: ids.join(','),
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const getCryptoHistory = async (id: string, days: number = 1) => {
  try {
    const { data } = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
      },
    });
    
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      time: Math.floor(timestamp / 1000), // Convert to seconds and ensure integer
      value: price,
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
};