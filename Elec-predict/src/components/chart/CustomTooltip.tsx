
import React from 'react';
import { TooltipProps } from 'recharts';
import { ForecastType } from '@/pages/Index';
import { TimeSeriesDataPoint, formatTooltipDate, getDisplayNameForDataKey, formatValue } from '@/utils/chartUtils';

interface CustomTooltipProps extends TooltipProps<number, string> {
  showConfidenceInterval: boolean;
  confidenceInterval: number;
  forecastType: ForecastType;
  showTooltip: boolean;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  showConfidenceInterval,
  confidenceInterval,
  forecastType,
  showTooltip,
}: CustomTooltipProps) => {
  if (active && payload && payload.length && showTooltip) {
    const dataPoint = payload[0]?.payload as TimeSeriesDataPoint;
    
    return (
      <div className="glass-panel p-3 shadow-md border border-white/30">
        <p className="font-medium text-sm mb-1">{formatTooltipDate(dataPoint.timestamp)}</p>
        {payload.map((entry, index) => {
          if (entry.dataKey === 'upper' || entry.dataKey === 'lower' || 
              entry.dataKey === 'upperPrice' || entry.dataKey === 'lowerPrice') return null;
          
          return (
            <div key={`item-${index}`} className="flex gap-2 items-center text-sm">
              <div 
                className="h-2 w-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize">{getDisplayNameForDataKey(entry.dataKey)}: </span>
              <span className="font-medium">
                {formatValue(entry.value as number | undefined, forecastType)}
              </span>
            </div>
          );
        })}
        {showConfidenceInterval && (
          <div className="text-xs text-muted-foreground mt-1 border-t border-border pt-1">
            <p className="font-medium mb-0.5">{confidenceInterval}% confidence interval:</p>
            {forecastType === 'demand' ? (
              <div className="flex items-center gap-1">
                <span>{formatValue(dataPoint.lower, forecastType)}</span>
                <span className="text-muted-foreground">→</span>
                <span>{formatValue(dataPoint.upper, forecastType)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span>{formatValue(dataPoint.lowerPrice, forecastType)}</span>
                <span className="text-muted-foreground">→</span>
                <span>{formatValue(dataPoint.upperPrice, forecastType)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
};
