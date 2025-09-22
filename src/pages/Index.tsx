import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { HotelCard } from "@/components/HotelCard";
import { HotelDetails } from "@/components/HotelDetails";
import { ReviewForm } from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { mockHotels, mockReviews } from "@/data/mockData";
import { Hotel, WifiReview, SearchFilters } from "@/types/hotel";
import { Wifi, MapPin, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-hotel-wifi.jpg";

type ViewMode = "search" | "details" | "review";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("search");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ sortBy: "rating" });
  const [hotels] = useState<Hotel[]>(mockHotels);
  const [reviews] = useState<WifiReview[]>(mockReviews);
  const { toast } = useToast();

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
      setViewMode("details");
    }
  };

  const handleAddReview = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
      setViewMode("review");
    }
  };

  const handleSubmitReview = (reviewData: any) => {
    toast({
      title: "Bewertung erfolgreich abgegeben!",
      description: `Vielen Dank für Ihre Bewertung von ${selectedHotel?.name}.`,
    });
    setViewMode("search");
    setSelectedHotel(null);
  };

  const handleBack = () => {
    setViewMode("search");
    setSelectedHotel(null);
  };

  const getHotelReviews = (hotelId: string) => {
    return reviews.filter(review => review.hotelId === hotelId);
  };

  if (viewMode === "details" && selectedHotel) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <HotelDetails
            hotel={selectedHotel}
            reviews={getHotelReviews(selectedHotel.id)}
            onBack={handleBack}
            onAddReview={() => setViewMode("review")}
          />
        </div>
      </div>
    );
  }

  if (viewMode === "review" && selectedHotel) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ReviewForm
            hotel={selectedHotel}
            onSubmit={handleSubmitReview}
            onCancel={handleBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hotel-WLAN <span className="text-primary-glow">Bewertungen</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Finden Sie Hotels mit der besten WLAN-Qualität für Ihre Reise
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                <span>Echte WLAN-Tests</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Verifizierte Bewertungen</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Live Speedtests</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {searchQuery ? (
                <>Ergebnisse für "{searchQuery}" ({filteredHotels.length})</>
              ) : (
                <>Empfohlene Hotels ({filteredHotels.length})</>
              )}
            </h2>
            
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

          {/* Hotel Grid */}
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

export default Index;
