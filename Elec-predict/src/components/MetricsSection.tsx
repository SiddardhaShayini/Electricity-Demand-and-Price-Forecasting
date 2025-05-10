
import { Activity, BarChart2, Zap, TrendingUp, TrendingDown, DollarSign, IndianRupee } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { ForecastType } from '@/pages/Index';

interface MetricsSectionProps {
  forecastType: ForecastType;
  peakDemand: { value: number; timestamp: string };
  totalUsage: number;
  peakPrice: { value: number; timestamp: string };
  lowestPrice: { value: number; timestamp: string };
  averagePrice: number;
  accuracyScore: number;
}

export function MetricsSection({
  forecastType,
  peakDemand,
  totalUsage,
  peakPrice,
  lowestPrice,
  averagePrice,
  accuracyScore,
}: MetricsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (forecastType === 'demand') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <div className="metrics-card">
          <div className="flex items-start">
            <div className="bg-secondary/50 p-2 rounded-lg mr-3">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Peak Demand</h3>
              <p className="text-2xl font-display font-medium">{peakDemand.value.toLocaleString()} kWh</p>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Expected on {formatDate(peakDemand.timestamp)}
          </p>
        </div>

        <div className="metrics-card">
          <div className="flex items-start">
            <div className="bg-secondary/50 p-2 rounded-lg mr-3">
              <BarChart2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Forecasted Usage</h3>
              <p className="text-2xl font-display font-medium">{totalUsage.toLocaleString()} kWh</p>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            For the selected time period
          </p>
        </div>

        <div className="metrics-card">
          <div className="flex items-start">
            <div className="bg-secondary/50 p-2 rounded-lg mr-3">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Accuracy Score</h3>
              <p className="text-2xl font-display font-medium">{accuracyScore}%</p>
            </div>
          </div>
          <div className="mt-2">
            <Progress value={accuracyScore} className="h-1.5" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <div className="metrics-card">
          <div className="flex items-start">
            <div className="bg-secondary/50 p-2 rounded-lg mr-3">
              <TrendingUp className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Peak Price</h3>
              <p className="text-2xl font-display font-medium">₹{peakPrice.value.toFixed(2)}/MWh</p>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Expected on {formatDate(peakPrice.timestamp)}
          </p>
        </div>

        <div className="metrics-card">
          <div className="flex items-start">
            <div className="bg-secondary/50 p-2 rounded-lg mr-3">
              <IndianRupee className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Average Price</h3>
              <p className="text-2xl font-display font-medium">₹{averagePrice.toFixed(2)}/MWh</p>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            <TrendingDown className="h-3 w-3 inline mr-1 text-emerald-500" />
            Lowest: ₹{lowestPrice.value.toFixed(2)}/MWh
          </p>
        </div>

        <div className="metrics-card">
          <div className="flex items-start">
            <div className="bg-secondary/50 p-2 rounded-lg mr-3">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Accuracy Score</h3>
              <p className="text-2xl font-display font-medium">{accuracyScore}%</p>
            </div>
          </div>
          <div className="mt-2">
            <Progress value={accuracyScore} className="h-1.5" />
          </div>
        </div>
      </div>
    );
  }
}
