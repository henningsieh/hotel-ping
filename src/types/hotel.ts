export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  avgWifiRating: number;
  numReviews: number;
  imageUrl?: string;
  distance?: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  amenities: string[];
}

export interface WifiReview {
  id: string;
  hotelId: string;
  userName: string;
  rating: number;
  comment: string;
  speedDown?: number; // Mbps
  speedUp?: number; // Mbps
  ping?: number; // ms
  createdAt: string;
}

export interface SearchFilters {
  minRating?: number;
  maxDistance?: number;
  priceRange?: Hotel["priceRange"][];
  sortBy: "rating" | "distance" | "reviews";
}