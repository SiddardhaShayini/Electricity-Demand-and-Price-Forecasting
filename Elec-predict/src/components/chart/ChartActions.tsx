
import React from 'react';
import { Download, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { ForecastType } from '@/pages/Index';

interface ChartActionsProps {
  forecastType: ForecastType;
  showTooltip: boolean;
  setShowTooltip: (show: boolean) => void;
  includePastData: boolean;
  setIncludePastData: (include: boolean) => void;
}

export const ChartActions: React.FC<ChartActionsProps> = ({
  forecastType,
  showTooltip,
  setShowTooltip,
  includePastData,
  setIncludePastData
}) => {
  const { toast } = useToast();

  const handleExport = (format: 'png' | 'csv') => {
    toast({
      title: `Exporting ${format.toUpperCase()}`,
      description: `Your forecast data will be downloaded as a ${format.toUpperCase()} file.`,
    });
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="px-2">
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass-panel">
          <DropdownMenuItem onClick={() => handleExport('png')}>
            Download PNG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('csv')}>
            Download CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass-panel">
          <DropdownMenuItem onClick={() => setShowTooltip(!showTooltip)}>
            {showTooltip ? <X className="h-4 w-4 mr-2" /> : null}
            {showTooltip ? 'Disable' : 'Enable'} Tooltips
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIncludePastData(!includePastData)}>
            {includePastData ? <X className="h-4 w-4 mr-2" /> : null}
            {includePastData ? 'Hide' : 'Show'} Historical Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
