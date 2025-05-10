import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DateRangePicker } from '@/components/DateRangePicker';
import { AdvancedOptions } from '@/components/AdvancedOptions';
import { ChartSection } from '@/components/ChartSection';
import { MetricsSection } from '@/components/MetricsSection';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Zap, DollarSign, IndianRupee } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { generateMockForecastData, calculateMetrics } from '@/mock/forecastData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ForecastTypeToggle } from '@/components/ForecastTypeToggle';

export type ForecastType = 'demand' | 'price';

const Index = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [region, setRegion] = useState('national-grid');
  const [confidenceInterval, setConfidenceInterval] = useState(90);
  const [includeWeather, setIncludeWeather] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [forecastType, setForecastType] = useState<ForecastType>('demand');
  const [metrics, setMetrics] = useState({
    peakDemand: { value: 0, timestamp: '' },
    totalUsage: 0,
    peakPrice: { value: 0, timestamp: '' },
    lowestPrice: { value: 0, timestamp: '' },
    averagePrice: 0,
    accuracyScore: 0
  });
  const [forecastGenerated, setForecastGenerated] = useState(false);

  const generateForecast = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Date range required",
        description: "Please select a start and end date for your forecast.",
        variant: "destructive"
      });
      return;
    }
  
    setIsLoading(true);
    setForecastGenerated(false);
  
    try {
      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];
  
      const rawData = await generateMockForecastData(startDate, endDate);
      console.log("Resolved forecast data:", rawData);
  
      // Transform the API response to match the expected format
      const formattedData = rawData.map((point: any) => ({
        timestamp: point.ds, // Ensure this matches what the chart expects on X-axis
        forecast: point.demand_forecast, // Ensure this is used for Y-axis
        forecastPrice: point.price_forecast
      }));
  
      console.log("Formatted data for chart:", formattedData);
  
      setForecastData(formattedData);
  
      const computedMetrics = calculateMetrics(formattedData, forecastType);
      setMetrics({
        ...metrics,
        ...computedMetrics
      });
  
      setForecastGenerated(true);
  
      toast({
        title: `${forecastType === 'demand' ? 'Demand' : 'Price'} forecast generated`,
        description: `Successfully generated electricity ${forecastType} forecast for ${region}.`,
      });
    } catch (error) {
      console.error("Error generating forecast:", error);
      toast({
        title: "Error",
        description: "Failed to generate forecast. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // When forecast type changes, recalculate metrics
  useEffect(() => {
    if (forecastGenerated && forecastData.length > 0) {
      const newMetrics = calculateMetrics(forecastData, forecastType);
      setMetrics({
        ...metrics,
        ...newMetrics
      });
    }
  }, [forecastType]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero background with animated energy wave */}
      <div className="h-[30vh] sm:h-[40vh] w-full relative bg-gradient-to-br from-blue-50 to-slate-100 overflow-hidden">
        <div className="energy-wave" />
        <div className="energy-wave" style={{ animationDelay: '2s' }} />
        <div className="energy-wave" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Electricity {forecastType === 'demand' ? 'Demand' : 'Price'} Forecasting
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Predict future electricity {forecastType === 'demand' ? 'consumption patterns' : 'price fluctuations'} with precision using advanced AI models.
          </p>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <div className="glass-panel p-6 sm:p-8 shadow-md mb-8 animate-slide-in">
          <div className="grid md:grid-cols-7 gap-6">
            <div className="md:col-span-3">
              <DateRangePicker 
                dateRange={dateRange} 
                onDateRangeChange={setDateRange} 
              />
            </div>
            <div className="md:col-span-2">
              <ForecastTypeToggle 
                forecastType={forecastType}
                onChange={setForecastType}
              />
            </div>
            <div className="md:col-span-2">
              <Button 
                className="w-full h-full min-h-[40px] bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-sm"
                onClick={generateForecast}
                disabled={isLoading}
              >
                {forecastType === 'demand' ? (
                  <Zap className={cn("mr-2 h-4 w-4", isLoading && "animate-pulse")} />
                ) : (
                  <IndianRupee className={cn("mr-2 h-4 w-4", isLoading && "animate-pulse")} />
                )}
                {isLoading ? "Generating..." : `Generate ${forecastType === 'demand' ? 'Demand' : 'Price'} Forecast`}
              </Button>
            </div>
          </div>
          
          
        </div>
        
        <div className={cn(
          "transition-opacity duration-300",
          forecastGenerated ? "opacity-100" : "opacity-0"
        )}>
          {forecastGenerated && (
            <>
              <div className="mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <MetricsSection
                  forecastType={forecastType}
                  peakDemand={metrics.peakDemand}
                  totalUsage={metrics.totalUsage}
                  peakPrice={metrics.peakPrice}
                  lowestPrice={metrics.lowestPrice}
                  averagePrice={metrics.averagePrice}
                  accuracyScore={metrics.accuracyScore}
                />
              </div>
              
              <div className="h-[500px] animate-slide-in" style={{ animationDelay: '0.3s' }}>
                <ChartSection
                  data={forecastData}
                  isLoading={isLoading}
                  showConfidenceInterval={true}
                  confidenceInterval={confidenceInterval}
                  forecastType={forecastType}
                />
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
