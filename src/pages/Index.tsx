import { useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SearchTab } from "@/components/tabs/SearchTab";
import { ReviewTab } from "@/components/tabs/ReviewTab";
import { SpeedtestTab } from "@/components/tabs/SpeedtestTab";
import { Hotel, SpeedtestResult } from "@/types/hotel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [preselectedHotel, setPreselectedHotel] = useState<Hotel | null>(null);
  const [speedtestResults, setSpeedtestResults] = useState<SpeedtestResult | null>(null);

  const handleSwitchToReview = (hotel: Hotel) => {
    setPreselectedHotel(hotel);
    setActiveTab("review");
  };

  const handleClearPreselection = () => {
    setPreselectedHotel(null);
  };

  const handleSpeedtestComplete = (results: SpeedtestResult) => {
    setSpeedtestResults(results);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "review") {
      setPreselectedHotel(null);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "search":
        return <SearchTab onSwitchToReview={handleSwitchToReview} />;
      case "review":
        return (
          <ReviewTab
            preselectedHotel={preselectedHotel}
            speedtestResults={speedtestResults}
            onClearPreselection={handleClearPreselection}
          />
        );
      case "speedtest":
        return (
          <SpeedtestTab
            onSpeedtestComplete={handleSpeedtestComplete}
            lastResults={speedtestResults}
          />
        );
      default:
        return <SearchTab onSwitchToReview={handleSwitchToReview} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 pb-16 overflow-hidden">
        {renderActiveTab()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
