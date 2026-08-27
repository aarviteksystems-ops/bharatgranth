import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BOOKS_DATA } from "../data/booksData";
import type { Verse, Book } from "../types/library";
import { Search as SearchIcon, BookOpen, Sparkles, Filter, ArrowRight } from "lucide-react";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>("All");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const qLower = query.toLowerCase().trim();

    const results: { verse: Verse; book: Book; chapterTitle: string }[] = [];

    BOOKS_DATA.forEach((book) => {
      if (selectedBookFilter !== "All" && book.id !== selectedBookFilter) return;

      book.chapters.forEach((ch) => {
        ch.verses.forEach((verse) => {
          const matchSanskrit = verse.sanskrit.toLowerCase().includes(qLower);
          const matchHindi = verse.hindi.toLowerCase().includes(qLower);
          const matchEnglish = verse.english.toLowerCase().includes(qLower);
          const matchSpeaker = verse.speaker?.toLowerCase().includes(qLower);
          const matchTranslit = verse.transliteration?.toLowerCase().includes(qLower);
          const matchKeywords = verse.keyWords?.some((k) => k.toLowerCase().includes(qLower));

          if (matchSanskrit || matchHindi || matchEnglish || matchSpeaker || matchTranslit || matchKeywords) {
            results.push({
              verse,
              book,
              chapterTitle: ch.titleSanskrit,
            });
          }
        });
      });
    });

    return results;
  }, [query, selectedBookFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Search Banner Header */}
        <div className="bg-stone-900/80 rounded-3xl border golden-border p-6 sm:p-8 space-y-6 text-center mandala-bg shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Universal Vedic Search</span>
          </div>

          <h1 className="font-devanagari text-3xl sm:text-5xl font-bold text-gold-gradient">
            Search Shlokas & Scriptures
          </h1>

          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by keywords, shloka, 'Karma', 'Hanuman', 'Dharma', 'Krishna'..."
                className="w-full bg-stone-950 border-2 golden-border-interactive rounded-2xl py-4 pl-12 pr-28 text-stone-100 text-sm placeholder-stone-400 focus:outline-none focus:border-amber-500"
              />
              <SearchIcon className="w-5 h-5 text-amber-400 absolute left-4" />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Book Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-2">
            <span className="text-stone-400 font-semibold mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              Filter by Book:
            </span>
            <button
              onClick={() => setSelectedBookFilter("All")}
              className={`px-3 py-1 rounded-lg transition ${
                selectedBookFilter === "All"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700"
              }`}
            >
              All Books
            </button>
            {BOOKS_DATA.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBookFilter(b.id)}
                className={`px-3 py-1 rounded-lg transition ${
                  selectedBookFilter === b.id
                    ? "bg-amber-500 text-stone-950 font-bold"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700"
                }`}
              >
                {b.titleSanskrit}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-3">
          <span>
            Found <strong className="text-amber-400">{searchResults.length}</strong> matching verses for "{query}"
          </span>
        </div>

        {/* Results List */}
        {searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map(({ verse, book, chapterTitle }) => (
              <div
                key={verse.id}
                className="bg-stone-900/80 rounded-2xl border golden-border p-6 space-y-4 shadow-xl hover:border-amber-500/50 transition"
              >
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {book.titleSanskrit}
                    </span>
                    <span className="text-xs text-stone-400 font-cinzel">
                      {chapterTitle} • Verse #{verse.verseNumber}
                    </span>
                  </div>

                  <Link
                    to={`/read/${book.id}/${verse.chapterId}#verse-${verse.verseNumber}`}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:underline font-bold"
                  >
                    <span>Read in Context</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="font-devanagari text-xl font-bold text-amber-100 leading-relaxed">
                  {verse.sanskrit}
                </p>

                <p className="font-devanagari text-sm text-stone-200">
                  {verse.hindi}
                </p>

                <p className="text-xs text-stone-400 italic">
                  "{verse.english}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          query.trim() && (
            <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 space-y-3">
              <BookOpen className="w-10 h-10 text-amber-500/50 mx-auto" />
              <h3 className="font-cinzel text-lg font-bold text-amber-300">No Direct Matches Found</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Try searching for broader keywords like 'Krishna', 'Dharma', 'Arjuna', 'Karma', or 'Hanuman'.
              </p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
