export type ThemeId = 'architect-mono' | 'architect-kinetic' | 'architect-refined';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
  typography: {
    header: string;
    body: string;
  };
  style: 'brutal' | 'kinetic' | 'refined';
}

export interface Project {
  title: string;
  category: string;
  images: string[];
  description: string;
  challenge?: string;
  solution?: string;
  metrics?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Print' | 'Digital' | 'Photography' | 'Videography' | 'Hard & Soft Goods';
  image: string;
  year: string;
  videoUrl?: string;
}