import type { Character } from "../types/library";
import { X, Sparkles, BookOpen, Quote, Shield } from "lucide-react";
import { Link } from "react-router";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-stone-900 border border-amber-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Character Header Avatar */}
        <div className="flex items-center gap-4 border-b border-amber-900/30 pb-6">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${character.avatarGradient} flex items-center justify-center text-stone-950 font-yatra text-3xl shadow-xl shrink-0`}
          >
            {character.nameSanskrit.charAt(0)}
          </div>
          <div>
            <h2 className="font-devanagari text-2xl font-bold text-gold-gradient">
              {character.nameSanskrit}
            </h2>
            <h3 className="font-cinzel text-sm font-bold text-amber-400">
              {character.nameEnglish}
            </h3>
            <p className="text-xs text-stone-400 italic">{character.title}</p>
          </div>
        </div>

        {/* Description & Role */}
        <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <div>
            <span className="font-semibold text-amber-400 uppercase tracking-wider block text-[11px] mb-1">
              Role & Significance:
            </span>
            <p>{character.role}</p>
          </div>

          <p className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 text-stone-300">
            {character.description}
          </p>

          {character.lineage && (
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Lineage: {character.lineage}</span>
            </div>
          )}
        </div>

        {/* Key Teachings */}
        <div className="space-y-2">
          <span className="font-cinzel text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Key Spiritual Virtues & Wisdom</span>
          </span>
          <ul className="space-y-2">
            {character.keyTeachings.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-stone-200 bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/60"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Associated Quote */}
        {character.quote && (
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-2xl space-y-2 text-center">
            <Quote className="w-5 h-5 text-amber-400 mx-auto" />
            <p className="font-devanagari text-base text-amber-200 font-bold">
              "{character.quote.sanskrit}"
            </p>
            <p className="text-xs text-stone-300 italic">"{character.quote.english}"</p>
            <p className="text-[10px] text-amber-400 font-cinzel uppercase font-bold">
              — {character.quote.source}
            </p>
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-lg transition"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
