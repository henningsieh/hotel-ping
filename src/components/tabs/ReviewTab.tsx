import { useState } from "react";
import { ReviewForm } from "@/components/ReviewForm";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { mockHotels } from "@/data/mockData";
import { Hotel, SearchFilters, SpeedtestResult } from "@/types/hotel";
import { Plus, Search, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewTabProps {
  preselectedHotel?: Hotel | null;
  speedtestResults?: SpeedtestResult | null;
  onClearPreselection?: () => void;
}

export const ReviewTab = ({ 
  preselectedHotel, 
  speedtestResults, 
  onClearPreselection 
}: ReviewTabProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(preselectedHotel || null);
  const [showHotelSearch, setShowHotelSearch] = useState(!preselectedHotel);
  const [searchQuery, setSearchQuery] = useState("");
  const [hotels] = useState<Hotel[]>(mockHotels);
  const { toast } = useToast();

  const filteredHotels = hotels.filter(hotel => 
    searchQuery.trim() === "" || 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Show only top 5 results

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
  };

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowHotelSearch(false);
  };

  const handleSubmitReview = (reviewData: any) => {
    toast({
      title: "Bewertung erfolgreich abgegeben!",
      description: `Vielen Dank für Ihre Bewertung von ${selectedHotel?.name}.`,
    });
    
    // Reset state
    setSelectedHotel(null);
    setShowHotelSearch(true);
    onClearPreselection?.();
  };

  const handleCancel = () => {
    setSelectedHotel(null);
    setShowHotelSearch(true);
    onClearPreselection?.();
  };

  const handleBack = () => {
    if (preselectedHotel) {
      onClearPreselection?.();
    } else {
      setSelectedHotel(null);
      setShowHotelSearch(true);
    }
  };

  if (selectedHotel && !showHotelSearch) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b border-border">
          <button onClick={handleBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="ml-2 text-lg font-semibold">WLAN bewerten</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ReviewForm
            hotel={selectedHotel}
            speedtestResults={speedtestResults}
            onSubmit={handleSubmitReview}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold mb-4">WLAN bewerten</h1>
        <p className="text-muted-foreground mb-4">
          Wählen Sie ein Hotel aus, um das WLAN zu bewerten
        </p>
        <SearchBar onSearch={handleSearch} showFilters={false} />
      </div>

      {/* Hotel Selection */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {filteredHotels.length > 0 ? (
            <div className="space-y-3">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => handleHotelSelect(hotel)}
                  className="p-4 border border-border rounded-lg bg-card cursor-pointer hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">{hotel.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {hotel.address}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-primary">
                            {hotel.avgWifiRating.toFixed(1)}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            ({hotel.numReviews} Bewertungen)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-primary ml-4 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() !== "" ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Keine Hotels gefunden</h3>
              <p className="text-muted-foreground">
                Versuchen Sie andere Suchbegriffe.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Hotel suchen</h3>
              <p className="text-muted-foreground">
                Geben Sie einen Hotelnamen oder Ort ein, um zu beginnen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};