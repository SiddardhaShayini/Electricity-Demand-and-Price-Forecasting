
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-slate-100 p-4">
      <div className="glass-panel p-8 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-5xl font-display font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
