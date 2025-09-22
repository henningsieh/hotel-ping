import { Hotel, WifiReview } from "@/types/hotel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WifiSignal } from "@/components/WifiSignal";
import { 
  MapPin, 
  Users, 
  Wifi, 
  Download, 
  Upload, 
  Gauge,
  ArrowLeft,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HotelDetailsProps {
  hotel: Hotel;
  reviews: WifiReview[];
  onBack: () => void;
  onAddReview: () => void;
}

export const HotelDetails = ({ 
  hotel, 
  reviews, 
  onBack, 
  onAddReview 
}: HotelDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  };

  const getSpeedStats = () => {
    const reviewsWithSpeed = reviews.filter(r => r.speedDown);
    if (reviewsWithSpeed.length === 0) return null;

    const avgDown = reviewsWithSpeed.reduce((sum, r) => sum + (r.speedDown || 0), 0) / reviewsWithSpeed.length;
    const avgUp = reviewsWithSpeed.reduce((sum, r) => sum + (r.speedUp || 0), 0) / reviewsWithSpeed.length;
    const avgPing = reviewsWithSpeed.reduce((sum, r) => sum + (r.ping || 0), 0) / reviewsWithSpeed.length;

    return { avgDown, avgUp, avgPing, count: reviewsWithSpeed.length };
  };

  const speedStats = getSpeedStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{hotel.name}</h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {hotel.address}, {hotel.city}
          </p>
        </div>
        <Button 
          onClick={onAddReview}
          variant="hero"
        >
          Bewertung abgeben
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Image */}
          <Card className="overflow-hidden">
            <div className="h-64 bg-muted">
              {hotel.imageUrl && (
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                WLAN-Bewertungen ({reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Noch keine Bewertungen vorhanden. Geben Sie die erste Bewertung ab!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{review.userName}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3 h-3",
                                  i < review.rating 
                                    ? "fill-warning text-warning" 
                                    : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <WifiSignal strength={review.rating} size="sm" />
                    </div>
                    
                    {review.comment && (
                      <p className="text-sm mb-3">{review.comment}</p>
                    )}
                    
                    {(review.speedDown || review.speedUp || review.ping) && (
                      <div className="flex gap-4 text-xs">
                        {review.speedDown && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Download className="w-3 h-3" />
                            {review.speedDown} Mbps
                          </div>
                        )}
                        {review.speedUp && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Upload className="w-3 h-3" />
                            {review.speedUp} Mbps
                          </div>
                        )}
                        {review.ping && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Gauge className="w-3 h-3" />
                            {review.ping} ms
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* WLAN Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-primary" />
                WLAN-Übersicht
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <WifiSignal strength={hotel.avgWifiRating} size="lg" className="justify-center mb-2" />
                <div className="text-2xl font-bold">{hotel.avgWifiRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">
                  aus {hotel.numReviews} Bewertungen
                </div>
              </div>

              {speedStats && (
                <div className="pt-4 border-t space-y-3">
                  <h4 className="font-medium text-sm">Durchschnittliche Geschwindigkeiten</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </span>
                      <span className="font-medium">{speedStats.avgDown.toFixed(1)} Mbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        Upload
                      </span>
                      <span className="font-medium">{speedStats.avgUp.toFixed(1)} Mbps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3 h-3" />
                        Ping
                      </span>
                      <span className="font-medium">{speedStats.avgPing.toFixed(0)} ms</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Basierend auf {speedStats.count} Speedtests
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hotel Info */}
          <Card>
            <CardHeader>
              <CardTitle>Hotel-Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Preisklasse</span>
                <Badge>{hotel.priceRange}</Badge>
              </div>
              
              {hotel.distance && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Entfernung</span>
                  <span className="text-sm font-medium">{hotel.distance} km</span>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-sm font-medium">Ausstattung</span>
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};