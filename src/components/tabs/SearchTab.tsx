import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { HotelCard } from "@/components/HotelCard";
import { HotelDetails } from "@/components/HotelDetails";
import { Button } from "@/components/ui/button";
import { mockHotels, mockReviews } from "@/data/mockData";
import { Hotel, WifiReview, SearchFilters } from "@/types/hotel";
import { MapPin, ArrowLeft } from "lucide-react";

interface SearchTabProps {
  onSwitchToReview: (hotel: Hotel) => void;
}

export const SearchTab = ({ onSwitchToReview }: SearchTabProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ sortBy: "rating" });
  const [hotels] = useState<Hotel[]>(mockHotels);
  const [reviews] = useState<WifiReview[]>(mockReviews);

  // Filter and sort hotels based on search
  const filteredHotels = useMemo(() => {
    let filtered = [...hotels];

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(query) ||
        hotel.city.toLowerCase().includes(query) ||
        hotel.address.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (searchFilters.minRating) {
      filtered = filtered.filter(hotel => hotel.avgWifiRating >= searchFilters.minRating!);
    }

    if (searchFilters.maxDistance) {
      filtered = filtered.filter(hotel => 
        !hotel.distance || hotel.distance <= searchFilters.maxDistance!
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (searchFilters.sortBy) {
        case "rating":
          return b.avgWifiRating - a.avgWifiRating;
        case "distance":
          return (a.distance || 0) - (b.distance || 0);
        case "reviews":
          return b.numReviews - a.numReviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [hotels, searchQuery, searchFilters]);

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const handleViewDetails = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
    }
  };

  const handleAddReview = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
      onSwitchToReview(hotel);
    }
  };

  const handleBack = () => {
    setSelectedHotel(null);
  };

  const getHotelReviews = (hotelId: string) => {
    return reviews.filter(review => review.hotelId === hotelId);
  };

  if (selectedHotel) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b border-border">
          <button onClick={handleBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="ml-2 text-lg font-semibold truncate">{selectedHotel.name}</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <HotelDetails
            hotel={selectedHotel}
            reviews={getHotelReviews(selectedHotel.id)}
            onBack={handleBack}
            onAddReview={() => handleAddReview(selectedHotel.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold mb-4">Hotels finden</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Results Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {searchQuery ? (
                  <>"{searchQuery}" ({filteredHotels.length})</>
                ) : (
                  <>Empfohlene Hotels ({filteredHotels.length})</>
                )}
              </h2>
            </div>
            
            {filteredHotels.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Sortiert nach: {
                  searchFilters.sortBy === "rating" ? "WLAN-Bewertung" :
                  searchFilters.sortBy === "distance" ? "Entfernung" :
                  "Anzahl Bewertungen"
                }
              </div>
            )}
          </div>

          {/* Hotel List */}
          {filteredHotels.length > 0 ? (
            <div className="space-y-4">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onViewDetails={handleViewDetails}
                  onAddReview={handleAddReview}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Keine Hotels gefunden</h3>
              <p className="text-muted-foreground mb-4">
                Versuchen Sie andere Suchbegriffe oder passen Sie Ihre Filter an.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSearchFilters({ sortBy: "rating" });
                }}
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};