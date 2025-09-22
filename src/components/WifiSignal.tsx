import { cn } from "@/lib/utils";

interface WifiSignalProps {
  strength: number; // 0-5 rating
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
}

export const WifiSignal = ({ 
  strength, 
  size = "md", 
  showRating = false,
  className 
}: WifiSignalProps) => {
  const getSignalColor = (rating: number) => {
    if (rating >= 4.5) return "text-success";
    if (rating >= 3.5) return "text-warning"; 
    return "text-destructive";
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm": return "h-3 gap-0.5";
      case "lg": return "h-6 gap-1";
      default: return "h-4 gap-0.5";
    }
  };

  const getBarClasses = (size: string) => {
    switch (size) {
      case "sm": return "w-0.5";
      case "lg": return "w-1.5";
      default: return "w-1";
    }
  };

  const bars = Array.from({ length: 5 }, (_, index) => {
    const barHeight = ((index + 1) * 20);
    const isActive = strength > index;
    
    return (
      <div
        key={index}
        className={cn(
          "wifi-bar rounded-sm transition-colors duration-300",
          getBarClasses(size),
          isActive ? getSignalColor(strength) : "bg-muted-foreground/20"
        )}
        style={{ height: `${barHeight}%` }}
      />
    );
  });

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("wifi-signal-bars flex items-end", getSizeClasses(size))}>
        {bars}
      </div>
      {showRating && (
        <span className={cn("text-sm font-medium", getSignalColor(strength))}>
          {strength.toFixed(1)}
        </span>
      )}
    </div>
  );
};