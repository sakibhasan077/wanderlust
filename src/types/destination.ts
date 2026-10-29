// Shape of a destination as returned by the backend (http://localhost:8000).
export interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  image: string;
  description: string;
  // Optional detail-page fields (shown on the destination details page).
  rating?: number;
  reviews?: number;
  overview?: string;
}
