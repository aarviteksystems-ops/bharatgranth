import { useParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BOOKS_DATA } from "../data/booksData";
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Star, 
  User, 
  ArrowRight, 
  Flame, 
  CheckCircle, 
  ChevronLeft 
} from "lucide-react";

export default function BookDetailPage() {
  const { bookId } = useParams();
  const book = BOOKS_DATA.find((b) => b.id === bookId) || BOOKS_DATA[0];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Book Header Hero Banner */}
        <section className={`relative bg-gradient-to-br ${book.coverGradient} border-b border-amber-900/40 py-16 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-7xl mx-auto space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-100 font-semibold bg-stone-950/60 px-3 py-1.5 rounded-full border border-stone-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-stone-950/80 backdrop-blur-md text-amber-400 font-cinzel text-xs font-bold px-3 py-1 rounded-lg border border-amber-500/30">
                    {book.category}
                  </span>
                  <div className="flex items-center gap-1 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 text-xs text-amber-300 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{book.rating.toFixed(1)} Rating</span>
                  </div>
                  <span className="text-xs text-stone-300 font-cinzel">{book.period}</span>
                </div>

                <h1 className="font-devanagari text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-100 leading-tight">
                  {book.titleSanskrit}
                </h1>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400">
                  {book.titleEnglish} • {book.titleHindi}
                </p>

                <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-3xl">
                  {book.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2 border-t border-amber-500/20">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Author: {book.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>{book.totalChapters} {book.sectionLabel}</span>
                  </div>
                </div>
              </div>

              {/* Start Reading Big Card */}
              <div className="bg-stone-950/80 border golden-border rounded-3xl p-6 space-y-4 text-center shadow-2xl backdrop-blur-md">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 font-yatra text-3xl">
                  ॐ
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-amber-300">Begin Sacred Reading</h3>
                  <p className="text-xs text-stone-400">Start with Chapter 1 or choose a section below</p>
                </div>
                <Link
                  to={`/read/${book.id}/${book.chapters[0]?.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-600/30 transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Reading Chapter 1</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTERS / PARVAS LIST */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <h2 className="font-devanagari text-2xl sm:text-3xl font-bold text-amber-100">
              {book.sectionLabel} & Chapters Directory
            </h2>
            <p className="text-xs text-stone-400">Select any section to read shlokas with Hindi & English translations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {book.chapters.map((ch, idx) => (
              <div
                key={ch.id}
                className="bg-stone-900/80 rounded-2xl border golden-border-interactive p-6 space-y-4 flex flex-col justify-between hover:border-amber-500/50 transition shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                      {ch.sectionName || `Section #${ch.number}`}
                    </span>
                    <span className="text-xs text-stone-400 font-cinzel">
                      {ch.shlokaCount} Key Verses
                    </span>
                  </div>

                  <h3 className="font-devanagari text-2xl font-bold text-amber-200">
                    {ch.titleSanskrit}
                  </h3>
                  <h4 className="font-cinzel text-xs font-bold text-amber-400">
                    {ch.titleEnglish} • {ch.titleHindi}
                  </h4>

                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {ch.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-xs text-stone-400">Est. 10 mins read</span>
                  <Link
                    to={`/read/${book.id}/${ch.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition"
                  >
                    <span>Read Verses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
