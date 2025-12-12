import { LocalizedString } from './yacht';

export type ServiceIcon =
  | 'anchor'
  | 'ship'
  | 'users'
  | 'briefcase'
  | 'megaphone'
  | 'calendar'
  | 'shield';

export interface Service {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: ServiceIcon;
  featured: boolean;
  image?: string;
  features?: {
    en: string[];
    pl: string[];
  };
}

export interface ServicesData {
  services: Service[];
}
