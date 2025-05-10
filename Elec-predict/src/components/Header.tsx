
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2 animate-fade-in">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-display font-semibold tracking-tight">
            ElectroForecast
          </h1>
        </div>
        
        <div className="animate-fade-in delay-100">
          <span className="text-sm text-muted-foreground italic font-light">
            AI-Powered Electricity Demand Prediction
          </span>
        </div>
      </div>
    </header>
  );
}
