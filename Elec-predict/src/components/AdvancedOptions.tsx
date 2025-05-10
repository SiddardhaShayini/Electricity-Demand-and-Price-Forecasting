
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CloudSun, Map } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdvancedOptionsProps {
  region: string;
  setRegion: (value: string) => void;
  confidenceInterval: number;
  setConfidenceInterval: (value: number) => void;
  includeWeather: boolean;
  setIncludeWeather: (value: boolean) => void;
}

export function AdvancedOptions({
  region,
  setRegion,
  confidenceInterval,
  setConfidenceInterval,
  includeWeather,
  setIncludeWeather,
}: AdvancedOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full glass-panel overflow-hidden transition-all duration-300">
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between p-4 text-sm font-medium"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Advanced Options</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      <div 
        className={`transition-all duration-300 ease-in-out px-4 ${
          isExpanded ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Map className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="region" className="text-sm font-medium">
                Region
              </Label>
            </div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region" className="bg-white/80">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="glass-panel">
                <SelectItem value="national-grid">National Grid</SelectItem>
                <SelectItem value="east-zone">East Zone</SelectItem>
                <SelectItem value="west-zone">West Zone</SelectItem>
                <SelectItem value="north-zone">North Zone</SelectItem>
                <SelectItem value="south-zone">South Zone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confidence-interval" className="text-sm font-medium flex items-center gap-2">
              <span>Confidence Interval: {confidenceInterval}%</span>
            </Label>
            <Slider
              id="confidence-interval"
              min={80}
              max={99}
              step={1}
              value={[confidenceInterval]}
              onValueChange={(value) => setConfidenceInterval(value[0])}
              className="py-2"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="include-weather" className="text-sm font-medium">
                Include Weather Data
              </Label>
            </div>
            <Switch
              id="include-weather"
              checked={includeWeather}
              onCheckedChange={setIncludeWeather}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
