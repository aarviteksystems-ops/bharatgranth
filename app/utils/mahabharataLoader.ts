import type { Verse } from "../types/library";

interface DynamicChapterData {
  chapterId: string;
  bookId: string;
  titleSanskrit: string;
  totalVerses: number;
  subParvas?: string[];
  verses: Verse[];
}

const chapterCache: Record<string, DynamicChapterData> = {};

/**
 * Fetch dynamic verse dataset for a chapter asynchronously from public JSON files.
 * Supports both Mahabharata parvas and Ramayana kandas.
 */
export async function fetchParvaData(chapterId: string): Promise<DynamicChapterData | null> {
  if (chapterCache[chapterId]) {
    return chapterCache[chapterId];
  }

  // Attempt mahabharata path first, then ramayana path
  const paths = [
    `/data/mahabharata/${chapterId}.json`,
    `/data/ramayana/${chapterId}.json`
  ];

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const data: DynamicChapterData = await response.json();
        chapterCache[chapterId] = data;
        return data;
      }
    } catch (e) {
      // Continue to next path
    }
  }

  return null;
}

export interface PaginatedVersesResult {
  verses: Verse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  subParvas: string[];
}

/**
 * Helper to paginate, filter, and search through verses of a Chapter.
 */
export function filterAndPaginateVerses(
  allVerses: Verse[],
  page: number = 1,
  pageSize: number = 50,
  searchQuery: string = "",
  subParvaFilter: string = "all"
): PaginatedVersesResult {
  let filtered = allVerses;

  // Filter by sub-parva
  if (subParvaFilter !== "all") {
    filtered = filtered.filter(
      (v: any) => v.subParva === subParvaFilter || v.subParvaHindi === subParvaFilter
    );
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((v) => {
      const verseNumStr = String(v.verseNumber);
      return (
        verseNumStr === q ||
        v.sanskrit.toLowerCase().includes(q) ||
        (v.transliteration && v.transliteration.toLowerCase().includes(q)) ||
        v.hindi.toLowerCase().includes(q) ||
        v.english.toLowerCase().includes(q) ||
        (v.speaker && v.speaker.toLowerCase().includes(q))
      );
    });
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (validPage - 1) * pageSize;
  const paginatedVerses = filtered.slice(startIndex, startIndex + pageSize);

  // Extract unique sub-parvas
  const subParvasSet = new Set<string>();
  allVerses.forEach((v: any) => {
    if (v.subParva) subParvasSet.add(v.subParva);
  });

  return {
    verses: paginatedVerses,
    totalCount,
    totalPages,
    currentPage: validPage,
    subParvas: Array.from(subParvasSet),
  };
}
