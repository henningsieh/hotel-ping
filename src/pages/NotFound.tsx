import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Wifi } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <Wifi className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Seite nicht gefunden</p>
          <p className="text-muted-foreground mb-8">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
        </div>
        <Button asChild variant="hero">
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
