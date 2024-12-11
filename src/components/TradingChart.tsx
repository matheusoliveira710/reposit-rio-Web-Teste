import React, { useEffect, useRef, useCallback } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { useTheme } from '../hooks/useTheme';

interface TradingChartProps {
  data: Array<{ time: number; value: number }>;
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ data, symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const { isDarkMode } = useTheme();

  const initChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: isDarkMode ? '#1a1a1a' : 'white' },
        textColor: isDarkMode ? '#d1d5db' : '#333333',
      },
      grid: {
        vertLines: { color: isDarkMode ? '#2d2d2d' : '#f0f0f0' },
        horzLines: { color: isDarkMode ? '#2d2d2d' : '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const lineSeries = chart.addLineSeries({
      color: '#2563eb',
      lineWidth: 2,
    });

    lineSeries.setData(data);
    chartRef.current = chart;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [data, isDarkMode]);

  useEffect(() => {
    const cleanup = initChart();
    return () => cleanup?.();
  }, [initChart]);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        {symbol.toUpperCase()} / USD
      </h2>
      <div ref={chartContainerRef} />
    </div>
  );
};