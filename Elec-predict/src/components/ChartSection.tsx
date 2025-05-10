
import React, { useState } from 'react';
import type { ForecastType } from '@/pages/Index';
import { TimeSeriesDataPoint } from '@/utils/chartUtils';
import { ChartActions } from './chart/ChartActions';
import { TimeSeriesChart } from './chart/TimeSeriesChart';

interface ChartSectionProps {
  data: TimeSeriesDataPoint[];
  isLoading: boolean;
  showConfidenceInterval: boolean;
  confidenceInterval: number;
  forecastType: ForecastType;
}

export function ChartSection({
  data,
  isLoading,
  showConfidenceInterval,
  confidenceInterval,
  forecastType,
}: ChartSectionProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [includePastData, setIncludePastData] = useState(true);

  return (
    <div className="chart-container w-full h-full min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-medium">
            Electricity {forecastType === 'demand' ? 'Demand' : 'Price'} Forecast
          </h2>
          {showConfidenceInterval && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {confidenceInterval}% CI
            </span>
          )}
        </div>
        <ChartActions 
          forecastType={forecastType}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          includePastData={includePastData}
          setIncludePastData={setIncludePastData}
        />
      </div>

      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse-soft text-primary">Loading forecast data...</div>
          </div>
        ) : (
          <TimeSeriesChart 
            data={data}
            forecastType={forecastType}
            showConfidenceInterval={showConfidenceInterval}
            confidenceInterval={confidenceInterval}
            showTooltip={showTooltip}
            includePastData={includePastData}
          />
        )}
      </div>
    </div>
  );
}
