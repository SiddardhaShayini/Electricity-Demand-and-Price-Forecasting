
import { TooltipProps } from 'recharts';
import type { ForecastType } from '@/pages/Index';

export interface TimeSeriesDataPoint {
  timestamp: string;
  actual?: number;
  forecast?: number;
  upper?: number;
  lower?: number;
  actualPrice?: number;
  forecastPrice?: number;
  upperPrice?: number;
  lowerPrice?: number;
}

export const formatXAxis = (tickItem: string) => {
  const date = new Date(tickItem);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const formatTooltipDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const getDisplayNameForDataKey = (dataKey: string | number): string => {
  // Convert to string and handle replacement only on string type
  const keyAsString = String(dataKey);
  return keyAsString.replace('Price', '');
};

export const formatValue = (value: number | undefined, forecastType: ForecastType): string => {
  if (value === undefined) return 'N/A';
  
  if (forecastType === 'demand') {
    return value.toLocaleString() + ' kWh';
  } else {
    return '$' + value.toFixed(2) + '/MWh';
  }
};
