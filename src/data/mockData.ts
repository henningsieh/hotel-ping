import { Hotel, WifiReview } from "@/types/hotel";

export const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Hotel Digital Plaza",
    address: "Hauptstraße 123",
    city: "Berlin",
    country: "Deutschland",
    avgWifiRating: 4.8,
    numReviews: 156,
    imageUrl: "/api/placeholder/300/200",
    distance: 0.3,
    priceRange: "$$$",
    amenities: ["Kostenloses WLAN", "Business Center", "Konferenzräume", "24/7 Support"]
  },
  {
    id: "2", 
    name: "TechnoLodge Munich",
    address: "Maximilianstraße 45",
    city: "München",
    country: "Deutschland",
    avgWifiRating: 4.2,
    numReviews: 89,
    imageUrl: "/api/placeholder/300/200",
    distance: 1.2,
    priceRange: "$$",
    amenities: ["Fiber Internet", "Coworking Space", "Smart Rooms"]
  },
  {
    id: "3",
    name: "ConnectInn Hamburg",
    address: "Speicherstadt 78",
    city: "Hamburg", 
    country: "Deutschland",
    avgWifiRating: 3.9,
    numReviews: 234,
    imageUrl: "/api/placeholder/300/200",
    distance: 2.1,
    priceRange: "$$$$",
    amenities: ["Premium WLAN", "Business Lounge", "Meeting Rooms"]
  },
  {
    id: "4",
    name: "WiFi Suites Cologne",
    address: "Rheinufer 12",
    city: "Köln",
    country: "Deutschland", 
    avgWifiRating: 4.6,
    numReviews: 67,
    imageUrl: "/api/placeholder/300/200",
    distance: 0.8,
    priceRange: "$$$",
    amenities: ["Gigabit WLAN", "Tech Concierge", "Smart TV"]
  },
  {
    id: "5",
    name: "Budget Connect Hotel",
    address: "Bahnhofstraße 90",
    city: "Frankfurt",
    country: "Deutschland",
    avgWifiRating: 3.4,
    numReviews: 145,
    imageUrl: "/api/placeholder/300/200", 
    distance: 3.5,
    priceRange: "$",
    amenities: ["Basis WLAN", "Shared Workspace"]
  }
];

export const mockReviews: WifiReview[] = [
  {
    id: "r1",
    hotelId: "1",
    userName: "TechNomad_Berlin",
    rating: 5,
    comment: "Fantastisches WLAN! Perfekt für Remote Work. Geschwindigkeiten waren konstant hoch, auch in der Lobby.",
    speedDown: 150.5,
    speedUp: 45.2,
    ping: 12,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "r2", 
    hotelId: "1",
    userName: "BusinessTraveler99",
    rating: 5,
    comment: "Keine Verbindungsabbrüche während wichtiger Videokonferenzen. TOP!",
    speedDown: 142.3,
    speedUp: 41.8,
    ping: 15,
    createdAt: "2024-01-12T14:15:00Z"
  },
  {
    id: "r3",
    hotelId: "2", 
    userName: "DigitalNomadMUC",
    rating: 4,
    comment: "Solide Geschwindigkeiten, gelegentliche kleine Aussetzer am Abend.",
    speedDown: 98.7,
    speedUp: 32.1,
    ping: 18,
    createdAt: "2024-01-10T09:45:00Z"
  },
  {
    id: "r4",
    hotelId: "3",
    userName: "StartupFounder",
    rating: 4,
    comment: "Gut für normale Nutzung, für Uploads von großen Dateien etwas langsam.",
    speedDown: 87.2,
    speedUp: 22.4,
    ping: 25,
    createdAt: "2024-01-08T16:20:00Z"
  },
  {
    id: "r5",
    hotelId: "4",
    userName: "RemoteWorker2024", 
    rating: 5,
    comment: "Gigabit WLAN hält was es verspricht. Streaming und Arbeiten gleichzeitig kein Problem.",
    speedDown: 187.9,
    speedUp: 52.3,
    ping: 8,
    createdAt: "2024-01-05T11:00:00Z"
  }
];