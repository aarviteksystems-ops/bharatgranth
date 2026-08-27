import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import type { Bookmark } from "../types/library";
import { 
  Bookmark as BookmarkIcon, 
  Trash2, 
  BookOpen, 
  Share2, 
  Sparkles, 
  ArrowRight, 
  MessageSquare 
} from "lucide-react";
import { QuoteCardModal } from "../components/QuoteCardModal";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedQuoteVerse, setSelectedQuoteVerse] = useState<any | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bharatgranth_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      setBookmarks([]);
    }
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bharatgranth_bookmarks", JSON.stringify(updated));
  };

  const clearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to clear all saved verses?")) {
      setBookmarks([]);
      localStorage.removeItem("bharatgranth_bookmarks");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
              <BookmarkIcon className="w-4 h-4" />
              <span>Personal Study Sanctuary</span>
            </div>
            <h1 className="font-devanagari text-3xl sm:text-4xl font-bold text-amber-100">
              Saved Verses & Study Notes (सञ्चित श्लोकाः)
            </h1>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Saved Verses</span>
            </button>
          )}
        </div>

        {/* Saved Verses Grid */}
        {bookmarks.length > 0 ? (
          <div className="space-y-6">
            {bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="bg-stone-900/80 rounded-2xl border golden-border p-6 space-y-4 shadow-xl relative"
              >
                <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-0.5 rounded-full">
                      {bm.bookTitle}
                    </span>
                    <span className="text-xs text-stone-400 font-cinzel">
                      {bm.chapterTitle} • Verse #{bm.verseNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/read/${bm.bookId}/${bm.chapterId}#verse-${bm.verseNumber}`}
                      className="flex items-center gap-1 text-xs text-amber-400 hover:underline font-bold px-2 py-1 bg-stone-800 rounded-lg"
                    >
                      <span>Read in Reader</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => removeBookmark(bm.id)}
                      className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-rose-400 transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="font-devanagari text-xl font-bold text-amber-100 leading-relaxed whitespace-pre-line">
                  {bm.sanskrit}
                </p>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {bm.translation}
                </p>

                {bm.note && (
                  <div className="bg-amber-950/30 border border-amber-900/40 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-200">
                    <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-400 block text-[10px] uppercase">My Reflection:</span>
                      <p>{bm.note}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-900/40 rounded-3xl border border-stone-800 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <BookmarkIcon className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-amber-300">No Saved Verses Yet</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              While reading any chapter in Mahabharata, Ramayana, Upanishads, or Gita, tap the bookmark icon on any Shloka to save it here for daily reflection.
            </p>
            <Link
              to="/read/bhagavad-gita/gita-ch-2"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 font-bold text-xs shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Bhagavad Gita Shlokas</span>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
