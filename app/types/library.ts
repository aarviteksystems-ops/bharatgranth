export type BookCategory = 
  | "Epics" // इतिहास - Mahabharata, Ramayana
  | "Upanishads" // उपनिषद् - Isha, Katha, Mandukya, etc.
  | "Puranas" // पुराण - Vishnu, Shiva, Bhagavata, Markandeya
  | "Vedas" // वेद - Rigveda, Samaveda, etc.
  | "Gita"; // भगवद्गीता

export interface Verse {
  id: string;
  chapterId: string;
  bookId: string;
  verseNumber: number | string;
  sanskrit: string;
  transliteration?: string;
  hindi: string;
  english: string;
  commentary?: string; // भावार्थ / विस्तृत अर्थ
  speaker?: string; // e.g. "श्रीभगवानुवाच", "अर्जुन उवाच", "धृतराष्ट्र उवाच"
  keyWords?: string[];
}

export interface Chapter {
  id: string;
  bookId: string;
  number: number;
  sectionName?: string; // e.g., "Bhishma Parva", "Sundara Kanda", "Mukhya Upanishad"
  titleSanskrit: string;
  titleHindi: string;
  titleEnglish: string;
  summary: string;
  shlokaCount: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  titleSanskrit: string;
  titleEnglish: string;
  titleHindi: string;
  category: BookCategory;
  author: string;
  period: string;
  totalChapters: number;
  description: string;
  coverGradient: string;
  coverPattern?: string;
  tags: string[];
  rating: number;
  readCount: number;
  sectionLabel: string; // "Parvas", "Kandas", "Chapters", "Suktas"
  chapters: Chapter[];
  isFeatured?: boolean;
}

export interface Character {
  id: string;
  nameSanskrit: string;
  nameEnglish: string;
  title: string;
  role: string;
  description: string;
  lineage?: string;
  keyTeachings: string[];
  associatedBooks: string[];
  avatarGradient: string;
  quote?: {
    sanskrit: string;
    english: string;
    source: string;
  };
}

export interface AudioChant {
  id: string;
  title: string;
  sanskritTitle: string;
  deity: string;
  duration: string;
  lyrics: string[];
  audioUrl?: string; // fallback synthetic voice or stream
  description: string;
}

export interface Bookmark {
  id: string;
  verseId: string;
  bookId: string;
  chapterId: string;
  bookTitle: string;
  chapterTitle: string;
  verseNumber: number | string;
  sanskrit: string;
  translation: string;
  note?: string;
  createdAt: string;
}

export interface ReadingProgress {
  bookId: string;
  lastChapterId: string;
  lastVerseNumber: number | string;
  progressPercent: number;
  updatedAt: string;
}

export type ReaderTheme = "sandalwood" | "dark-temple" | "vedic-parchment" | "oled-night";
