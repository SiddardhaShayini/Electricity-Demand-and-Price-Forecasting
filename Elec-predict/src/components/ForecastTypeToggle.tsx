import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, IndianRupee } from 'lucide-react';
import type { ForecastType } from '@/pages/Index';

interface ForecastTypeToggleProps {
  forecastType: ForecastType;
  onChange: (value: ForecastType) => void;
}

export function ForecastTypeToggle({ 
  forecastType, 
  onChange 
}: ForecastTypeToggleProps) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-muted-foreground mb-2 block">
        Forecast Type
      </label>
      <Tabs
        value={forecastType}
        onValueChange={(value) => onChange(value as ForecastType)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="demand" className="flex items-center justify-center gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            <span>Demand</span>
          </TabsTrigger>
          <TabsTrigger value="price" className="flex items-center justify-center gap-1.5">
            <IndianRupee className="h-3.5 w-3.5" />
            <span>Price</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}