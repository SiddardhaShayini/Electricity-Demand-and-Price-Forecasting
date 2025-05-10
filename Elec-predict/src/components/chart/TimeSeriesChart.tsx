
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';
import { ForecastType } from '@/pages/Index';
import { TimeSeriesDataPoint, formatXAxis } from '@/utils/chartUtils';
import { CustomTooltip } from './CustomTooltip';

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  forecastType: ForecastType;
  showConfidenceInterval: boolean;
  confidenceInterval: number;
  showTooltip: boolean;
  includePastData: boolean;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  forecastType,
  showConfidenceInterval,
  confidenceInterval,
  showTooltip,
  includePastData
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={formatXAxis} 
          tick={{ fontSize: 12 }}
          stroke="#888"
        />
        <YAxis 
          width={50} 
          tick={{ fontSize: 12 }} 
          domain={['auto', 'auto'] as AxisDomain}
          stroke="#888"
          label={{
            value: forecastType === 'demand' ? 'kWh' : '₹/MWh', 
            angle: -90, 
            position: 'insideLeft'
          }}
        />
        <Tooltip content={
          <CustomTooltip 
            showConfidenceInterval={showConfidenceInterval} 
            confidenceInterval={confidenceInterval}
            forecastType={forecastType}
            showTooltip={showTooltip}
          />
        } />
        <Legend />
        
        {/* Add nice confidence interval shading */}
        {showConfidenceInterval && forecastType === 'demand' && (
          <Area 
            type="monotone" 
            dataKey="forecast" 
            stroke="none" 
            fill="#FF6B00" 
            fillOpacity={0.1}
            activeDot={false}
            legendType="none"
          />
        )}
        
        {showConfidenceInterval && forecastType === 'price' && (
          <Area 
            type="monotone" 
            dataKey="forecastPrice" 
            stroke="none" 
            fill="#FF6B00" 
            fillOpacity={0.1}
            activeDot={false}
            legendType="none"
          />
        )}
        
        {/* Confidence interval areas */}
        {showConfidenceInterval && forecastType === 'demand' && (
          <Area 
            type="monotone" 
            dataKey="upper" 
            stroke="#FF6B00" 
            strokeWidth={1}
            strokeOpacity={0.5}
            fill="#FF6B00" 
            fillOpacity={0.2}
            name={`${confidenceInterval}% Upper Bound`}
            activeDot={false}
            connectNulls
          />
        )}
        
        {showConfidenceInterval && forecastType === 'demand' && (
          <Area 
            type="monotone" 
            dataKey="lower" 
            stroke="#FF6B00" 
            strokeWidth={1}
            strokeOpacity={0.5}
            fill="#FF6B00" 
            fillOpacity={0}
            name={`${confidenceInterval}% Lower Bound`}
            activeDot={false}
            connectNulls
            legendType="none"
          />
        )}
        
        {showConfidenceInterval && forecastType === 'price' && (
          <Area 
            type="monotone" 
            dataKey="upperPrice" 
            stroke="#FF6B00" 
            strokeWidth={1}
            strokeOpacity={0.5}
            fill="#FF6B00" 
            fillOpacity={0.2}
            name={`${confidenceInterval}% Upper Bound`}
            activeDot={false}
            connectNulls
          />
        )}
        
        {showConfidenceInterval && forecastType === 'price' && (
          <Area 
            type="monotone" 
            dataKey="lowerPrice" 
            stroke="#FF6B00" 
            strokeWidth={1}
            strokeOpacity={0.5}
            fill="#FF6B00" 
            fillOpacity={0}
            name={`${confidenceInterval}% Lower Bound`}
            activeDot={false}
            connectNulls
            legendType="none"
          />
        )}
        
        
        
        {forecastType === 'demand' ? (
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#FF6B00" 
            strokeWidth={2.5} 
            activeDot={{ r: 6 }}
            name="Forecast"
            connectNulls
          />
        ) : (
          <Line 
            type="monotone" 
            dataKey="forecastPrice" 
            stroke="#FF6B00" 
            strokeWidth={2.5} 
            activeDot={{ r: 6 }}
            name="Forecast"
            connectNulls
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
