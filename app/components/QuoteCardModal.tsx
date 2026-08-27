import { useState } from "react";
import type { Verse, Book } from "../types/library";
import { X, Copy, Download, Check, Sparkles, Share2 } from "lucide-react";

interface QuoteCardModalProps {
  verse: Verse;
  book?: Book;
  onClose: () => void;
}

export function QuoteCardModal({ verse, book, onClose }: QuoteCardModalProps) {
  const [copied, setCopied] = useState(false);
  const [themeStyle, setThemeStyle] = useState<"royal" | "gold" | "parchment" | "dark">("royal");

  const handleCopyText = () => {
    const textToCopy = `"${verse.sanskrit}"\n\n- ${verse.speaker || book?.titleSanskrit}\n\nTranslation: ${verse.english}\n\nVia BharatGranth Digital Library`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-900/60 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-lg font-bold text-amber-300">
              Sacred Shloka Poster Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Picker buttons */}
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-300">
          <span className="mr-1 text-stone-400">Card Theme:</span>
          <button
            onClick={() => setThemeStyle("royal")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              themeStyle === "royal"
                ? "bg-amber-900/60 border-amber-500 text-amber-300"
                : "border-stone-800 bg-stone-900 hover:bg-stone-800"
            }`}
          >
            Royal Maroon
          </button>
          <button
            onClick={() => setThemeStyle("gold")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              themeStyle === "gold"
                ? "bg-amber-600/30 border-amber-400 text-amber-200"
                : "border-stone-800 bg-stone-900 hover:bg-stone-800"
            }`}
          >
            Sandalwood
          </button>
          <button
            onClick={() => setThemeStyle("dark")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              themeStyle === "dark"
                ? "bg-stone-950 border-amber-500/60 text-stone-100"
                : "border-stone-800 bg-stone-900 hover:bg-stone-800"
            }`}
          >
            Midnight
          </button>
        </div>

        {/* The Graphic Poster Container */}
        <div
          id="quote-card-poster"
          className={`p-8 rounded-2xl border-2 relative overflow-hidden transition-all text-center space-y-5 shadow-2xl ${
            themeStyle === "royal"
              ? "bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 border-amber-500/50 text-amber-50"
              : themeStyle === "gold"
              ? "bg-gradient-to-br from-amber-900 via-amber-950 to-orange-950 border-amber-400/60 text-amber-100"
              : "bg-stone-950 border-stone-800 text-stone-100"
          }`}
        >
          {/* Corner Traditional Decorative Motifs */}
          <div className="absolute top-3 left-3 text-amber-500/40 font-yatra text-xl">ॐ</div>
          <div className="absolute top-3 right-3 text-amber-500/40 font-yatra text-xl">卐</div>
          <div className="absolute bottom-3 left-3 text-amber-500/40 text-xs font-cinzel">BHARATGRANTH</div>
          <div className="absolute bottom-3 right-3 text-amber-500/40 text-xs font-cinzel">SHLOKA #{verse.verseNumber}</div>

          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 font-yatra text-2xl">
            ॐ
          </div>

          <div className="space-y-3">
            <p className="font-devanagari text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-line text-amber-200">
              {verse.sanskrit}
            </p>

            {verse.speaker && (
              <p className="font-cinzel text-xs font-semibold text-amber-400 uppercase tracking-widest">
                — {verse.speaker} —
              </p>
            )}
          </div>

          <p className="text-xs text-stone-300 italic font-sans px-4 leading-relaxed border-t border-amber-500/20 pt-4">
            "{verse.english}"
          </p>

          <div className="pt-2 text-[10px] text-amber-400/80 font-cinzel font-semibold tracking-widest uppercase">
            {book?.titleSanskrit} • {book?.titleEnglish}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied Shloka!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy Verse Text</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
