import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WifiSignal } from "@/components/WifiSignal";
import { Star, Wifi, Gauge, Upload, Download } from "lucide-react";
import { Hotel } from "@/types/hotel";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  hotel: Hotel;
  onSubmit: (review: {
    rating: number;
    comment: string;
    speedDown?: number;
    speedUp?: number;
    ping?: number;
  }) => void;
  onCancel: () => void;
}

export const ReviewForm = ({ hotel, onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [speedDown, setSpeedDown] = useState("");
  const [speedUp, setSpeedUp] = useState("");
  const [ping, setPing] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Bitte geben Sie eine Bewertung ab.");
      return;
    }

    onSubmit({
      rating,
      comment,
      speedDown: speedDown ? Number(speedDown) : undefined,
      speedUp: speedUp ? Number(speedUp) : undefined,
      ping: ping ? Number(ping) : undefined,
    });
  };

  const StarRating = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className="p-1 rounded-full hover:bg-muted transition-colors"
        >
          <Star
            className={cn(
              "w-8 h-8 transition-colors",
              (hoveredStar >= star || rating >= star)
                ? "fill-warning text-warning"
                : "text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Wifi className="w-6 h-6 text-primary" />
            WLAN-Bewertung abgeben
          </CardTitle>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{hotel.name}</span>
            <Badge variant="outline">{hotel.city}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Wie bewerten Sie die WLAN-Qualität? *
              </Label>
              <div className="flex items-center gap-4">
                <StarRating />
                {rating > 0 && (
                  <div className="flex items-center gap-2">
                    <WifiSignal strength={rating} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      {rating === 5 && "Ausgezeichnet"}
                      {rating === 4 && "Sehr gut"}
                      {rating === 3 && "Gut"}
                      {rating === 2 && "Ausreichend"}
                      {rating === 1 && "Schlecht"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment">Ihre Erfahrung (optional)</Label>
              <Textarea
                id="comment"
                placeholder="Beschreiben Sie Ihre Erfahrung mit dem WLAN..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            {/* Speed Test Data */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Speedtest-Daten (optional)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="speedDown" className="flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download (Mbps)
                  </Label>
                  <Input
                    id="speedDown"
                    type="number"
                    step="0.1"
                    placeholder="z.B. 150.5"
                    value={speedDown}
                    onChange={(e) => setSpeedDown(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="speedUp" className="flex items-center gap-2 text-sm">
                    <Upload className="w-4 h-4" />
                    Upload (Mbps)
                  </Label>
                  <Input
                    id="speedUp"
                    type="number"
                    step="0.1"
                    placeholder="z.B. 45.2"
                    value={speedUp}
                    onChange={(e) => setSpeedUp(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ping" className="flex items-center gap-2 text-sm">
                    <Gauge className="w-4 h-4" />
                    Ping (ms)
                  </Label>
                  <Input
                    id="ping"
                    type="number"
                    placeholder="z.B. 12"
                    value={ping}
                    onChange={(e) => setPing(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1"
                disabled={rating === 0}
              >
                Bewertung abgeben
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};