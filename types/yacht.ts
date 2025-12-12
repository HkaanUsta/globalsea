export interface YachtSpecifications {
  length: number;
  lengthUnit: 'm' | 'ft';
  cabins: number;
  guests: number;
  crew: number;
  yearBuilt: number;
  builder: string;
  cruisingSpeed?: number;
  maxSpeed?: number;
  beam?: number;
  draft?: number;
}

export interface YachtPricing {
  weeklyFrom?: number;
  currency: 'EUR' | 'USD' | 'GBP';
  salePriceFrom?: number;
}

export type YachtAmenity =
  | 'jacuzzi'
  | 'jetski'
  | 'wifi'
  | 'airConditioning'
  | 'waterToys'
  | 'gym'
  | 'beach-club'
  | 'stabilizers'
  | 'tender'
  | 'snorkeling'
  | 'diving'
  | 'fishing'
  | 'paddleboard'
  | 'kayak';

export interface LocalizedString {
  en: string;
  pl: string;
}

export interface Yacht {
  id: string;
  slug: string;
  name: LocalizedString;
  featured: boolean;
  images: string[];
  thumbnail: string;
  description: LocalizedString;
  specifications: YachtSpecifications;
  amenities: YachtAmenity[];
  destinations: string[];
  pricing: YachtPricing;
  forSale: boolean;
  forCharter: boolean;
}

export interface YachtsData {
  yachts: Yacht[];
}
