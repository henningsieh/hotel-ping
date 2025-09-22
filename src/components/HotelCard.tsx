import { Hotel } from "@/types/hotel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WifiSignal } from "@/components/WifiSignal";
import { MapPin, Users, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails: (hotelId: string) => void;
  onAddReview: (hotelId: string) => void;
  className?: string;
}

export const HotelCard = ({ 
  hotel, 
  onViewDetails, 
  onAddReview, 
  className 
}: HotelCardProps) => {
  const getPriceColor = (range: Hotel["priceRange"]) => {
    switch (range) {
      case "$": return "bg-success/10 text-success";
      case "$$": return "bg-warning/10 text-warning";
      case "$$$": return "bg-primary/10 text-primary";
      case "$$$$": return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <Card className={cn(
      "card-shadow hover:card-shadow-hover transition-smooth cursor-pointer group overflow-hidden",
      className
    )}>
      <CardContent className="p-0">
        {/* Hotel Image */}
        <div className="relative h-48 bg-muted">
          {hotel.imageUrl && (
            <img 
              src={hotel.imageUrl} 
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute top-3 right-3">
            <Badge className={getPriceColor(hotel.priceRange)}>
              {hotel.priceRange}
            </Badge>
          </div>
          {hotel.distance && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {hotel.distance} km
              </Badge>
            </div>
          )}
        </div>

        {/* Hotel Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {hotel.name}
              </h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {hotel.address}, {hotel.city}
              </p>
            </div>
          </div>

          {/* WiFi Rating */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg">
            <Wifi className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <WifiSignal strength={hotel.avgWifiRating} showRating />
                <span className="text-xs text-muted-foreground">WLAN-Qualität</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                {hotel.numReviews} Bewertungen
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {hotel.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{hotel.amenities.length - 3} weitere
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onViewDetails(hotel.id)}
            >
              Details
            </Button>
            <Button 
              size="sm" 
              variant="hero"
              className="flex-1"
              onClick={() => onAddReview(hotel.id)}
            >
              Bewerten
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};