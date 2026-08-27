import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CharacterModal } from "../components/CharacterModal";
import { CHARACTERS_DATA } from "../data/charactersData";
import type { Character } from "../types/library";
import { Users, Search, Sparkles, Shield } from "lucide-react";

export default function CharactersPage() {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCharacters = CHARACTERS_DATA.filter(
    (c) =>
      c.nameSanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Header */}
        <div className="bg-stone-900/80 rounded-3xl border golden-border p-6 sm:p-8 space-y-6 text-center mandala-bg shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>Patra Parichay • Lineage Archive</span>
          </div>

          <h1 className="font-devanagari text-3xl sm:text-5xl font-bold text-gold-gradient">
            Epic Characters & Divine Lineage (पात्र परिचय)
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Discover the life, lineage, spiritual virtues, and eternal teachings of key figures across Mahabharata, Ramayana, and Upanishads.
          </p>

          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search characters (e.g., Rama, Krishna, Karna, Nachiketa)..."
              className="w-full bg-stone-950 border border-amber-900/50 rounded-2xl py-3 pl-10 pr-4 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              onClick={() => setActiveCharacter(char)}
              className="group bg-stone-900/80 rounded-2xl border golden-border-interactive p-6 cursor-pointer space-y-4 hover:-translate-y-1 transition shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${char.avatarGradient} flex items-center justify-center text-stone-950 font-yatra text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    {char.nameSanskrit.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-devanagari text-xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                      {char.nameSanskrit}
                    </h3>
                    <h4 className="font-cinzel text-xs font-bold text-amber-400">
                      {char.nameEnglish}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                  {char.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-amber-400">
                <span className="truncate max-w-[180px]">{char.title}</span>
                <span className="font-bold underline group-hover:text-amber-300 shrink-0">View Profile →</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {activeCharacter && (
        <CharacterModal character={activeCharacter} onClose={() => setActiveCharacter(null)} />
      )}
    </div>
  );
}
