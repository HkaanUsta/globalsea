import { LocalizedString } from './yacht';

export interface PopularRoute {
  en: string;
  pl: string;
}

export interface DestinationClimate {
  en: string;
  pl: string;
}

export interface DestinationHighlights {
  en: string[];
  pl: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: LocalizedString;
  featured: boolean;
  image: string;
  thumbnail: string;
  description: LocalizedString;
  highlights: DestinationHighlights;
  popularRoutes: PopularRoute[];
  bestSeason: string;
  climate: DestinationClimate;
  gallery?: string[];
}

export interface DestinationsData {
  destinations: Destination[];
}
