import { LocalizedString } from './yacht';

export interface Event {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  location: LocalizedString;
  image: string;
  gallery?: string[];
  featured: boolean;
  upcoming: boolean;
  registrationLink?: string;
}

export interface EventsData {
  events: Event[];
}
