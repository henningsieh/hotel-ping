import { Search, Plus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    {
      id: "search",
      label: "Suchen",
      icon: Search,
    },
    {
      id: "review",
      label: "Bewerten",
      icon: Plus,
    },
    {
      id: "speedtest",
      label: "Speedtest",
      icon: Zap,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="grid grid-cols-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 transition-smooth",
                "text-xs font-medium",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1 transition-smooth",
                  isActive && "text-primary"
                )} 
              />
              <span className={cn(isActive && "text-primary font-semibold")}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};