
export interface Review {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface TourDate {
  startDate: string; // ISO format YYYY-MM-DD
  endDate: string;   // ISO format YYYY-MM-DD
  totalSpots: number;
  bookedSpots: number;
}

export type TourCategory = 'one-day' | 'multi-day' | 'jeep' | 'excursion' | 'gastro' | 'other';

export interface Tour {
  id: string;
  title: string;
  price: string;
  duration: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный' | 'Экстрим' | 'Easy' | 'Medium' | 'Hard' | 'Extreme' | '简单' | '中等' | '困难' | '极限';
  distance: string;
  location: string;
  image: string;
  gallery?: string[];
  shortDesc?: string; // Brief description for the card
  desc: string; // Full description for the modal
  program: string[];
  gear: string;
  color: string;
  category: TourCategory;
  reviews: Review[];
  dates?: TourDate[];
  groupSizeInfo?: string; // e.g. "4-10 people"
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  desc: string;
  image: string;
  instagram?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  large: boolean;
}