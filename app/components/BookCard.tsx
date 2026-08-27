import { Link } from "react-router";
import type { Book } from "../types/library";
import { BookOpen, Star, Layers, ArrowRight } from "lucide-react";

interface BookCardProps {
  book: Book;
  progressPercent?: number;
}

export function BookCard({ book, progressPercent = 0 }: BookCardProps) {
  const firstChapter = book.chapters[0]?.id || "";

  return (
    <div className="group relative bg-stone-900/80 rounded-2xl border golden-border-interactive overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl">
      {/* Top Cover Banner */}
      <div className={`relative h-44 bg-gradient-to-br ${book.coverGradient} p-5 flex flex-col justify-between overflow-hidden`}>
        {/* Decorative Mandala watermark circle */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border-4 border-amber-500/10 pointer-events-none" />
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border border-amber-500/20 pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <span className="bg-stone-950/80 backdrop-blur-md text-amber-400 font-cinzel text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
            {book.category}
          </span>
          <div className="flex items-center gap-1 bg-stone-950/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-stone-800 text-xs text-amber-300 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="z-10 mt-auto">
          <h3 className="font-devanagari text-2xl font-bold text-amber-100 group-hover:text-amber-300 transition leading-tight">
            {book.titleSanskrit}
          </h3>
          <p className="font-cinzel text-xs font-semibold text-amber-400/90 tracking-wide">
            {book.titleEnglish}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
          {book.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-800/80 pt-3">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {book.totalChapters} {book.sectionLabel}
              </span>
            </div>
            <span className="text-stone-400 text-[11px]">{book.period}</span>
          </div>

          {/* Reading progress bar if exists */}
          {progressPercent > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-amber-400">
                <span>Reading Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={`/book/${book.id}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview</span>
            </Link>

            <Link
              to={`/read/${book.id}/${firstChapter}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 text-xs font-bold hover:brightness-110 shadow-md shadow-amber-600/20 transition"
            >
              <span>Read Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
