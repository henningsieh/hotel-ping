import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { SearchFilters } from "@/types/hotel";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

export const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: "rating"
  });

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(searchQuery, newFilters);
  };

  const hasActiveFilters = filters.minRating || filters.maxDistance || filters.priceRange?.length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Hotel oder Stadt suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button 
          onClick={handleSearch}
          variant="hero"
          className="h-12 px-6"
        >
          <Search className="w-4 h-4 mr-2" />
          Suchen
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-12 px-4",
            (showFilters || hasActiveFilters) && "bg-primary/10 border-primary/20"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sortieren nach</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value: "rating" | "distance" | "reviews") => 
                  updateFilter("sortBy", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">WLAN-Bewertung</SelectItem>
                  <SelectItem value="distance">Entfernung</SelectItem>
                  <SelectItem value="reviews">Anzahl Bewertungen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Min Rating Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Min. WLAN-Bewertung</label>
              <Select
                value={filters.minRating?.toString() || ""}
                onValueChange={(value) => 
                  updateFilter("minRating", value ? Number(value) : undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alle Bewertungen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.5">4.5+ Sterne</SelectItem>
                  <SelectItem value="4.0">4.0+ Sterne</SelectItem>
                  <SelectItem value="3.5">3.5+ Sterne</SelectItem>
                  <SelectItem value="3.0">3.0+ Sterne</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Distance */}
            <div>
              <label className="text-sm font-medium mb-2 block">Max. Entfernung</label>
              <Select
                value={filters.maxDistance?.toString() || ""}
                onValueChange={(value) => 
                  updateFilter("maxDistance", value ? Number(value) : undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Beliebige Entfernung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Bis 1 km</SelectItem>
                  <SelectItem value="2">Bis 2 km</SelectItem>
                  <SelectItem value="5">Bis 5 km</SelectItem>
                  <SelectItem value="10">Bis 10 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {filters.minRating && (
                <Badge variant="secondary" className="gap-1">
                  Min. {filters.minRating}⭐
                  <button 
                    onClick={() => updateFilter("minRating", undefined)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.maxDistance && (
                <Badge variant="secondary" className="gap-1">
                  Max. {filters.maxDistance}km
                  <button 
                    onClick={() => updateFilter("maxDistance", undefined)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};