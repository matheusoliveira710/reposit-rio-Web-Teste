import { useState, useEffect } from 'react';
import { getCryptoPrices, getCryptoHistory } from '../services/cryptoApi';
import { CryptoPrice } from '../types/crypto';

export const useCryptoData = (cryptoIds: string[]) => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPrices = async () => {
      try {
        setLoading(true);
        const data = await getCryptoPrices(cryptoIds);
        if (mounted) {
          setPrices(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch crypto prices');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [cryptoIds]);

  return { prices, loading, error };
};