
import { InfoIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border mt-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-start gap-2">
            <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="text-xs">
              Forecast data is based on statistical models and historical usage patterns. 
              Actual electricity demand may vary due to weather events, economic changes, or other unforeseen factors.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} ElectroForecast. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
