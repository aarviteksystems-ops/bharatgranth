import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BookCard } from "../components/BookCard";
import { CharacterModal } from "../components/CharacterModal";
import { AudioPlayerDrawer } from "../components/AudioPlayerDrawer";
import { QuoteCardModal } from "../components/QuoteCardModal";
import { BOOKS_DATA } from "../data/booksData";
import { CHARACTERS_DATA } from "../data/charactersData";
import { AUDIO_CHANTS } from "../data/audioChants";
import type { BookCategory, Character, Verse, AudioChant } from "../types/library";
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Flame, 
  Music, 
  Users, 
  Compass, 
  Star, 
  Volume2, 
  Share2, 
  ArrowRight, 
  Bookmark, 
  CheckCircle 
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | "All">("All");
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [activeAudioChant, setActiveAudioChant] = useState<AudioChant | undefined>(undefined);
  const [selectedQuoteVerse, setSelectedQuoteVerse] = useState<Verse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Shloka of the Day
  const shlokaOfTheDay: Verse = {
    id: "sod-gita-2-47",
    chapterId: "gita-ch-2",
    bookId: "bhagavad-gita",
    verseNumber: "भगवद्गीता २.४७",
    speaker: "श्रीभगवानुवाच",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    transliteration: "Karmaṇyevādhikāraste mā phaleṣu kadācana |\nMā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||",
    hindi: "तुम्हें केवल कर्म करने का अधिकार है, उसके फल पर कभी नहीं। फल की इच्छा से रहित होकर अपना श्रेष्ठ कर्तव्य करते रहो।",
    english: "You have a right performing your prescribed duty, but never to its fruits. Perform your duty with an unattached mind.",
    commentary: "Focus completely on the quality of your action, letting go of anxiety regarding future results."
  };

  const categories: (BookCategory | "All")[] = [
    "All",
    "Epics",
    "Gita",
    "Upanishads",
    "Puranas",
    "Vedas",
  ];

  const filteredBooks = selectedCategory === "All"
    ? BOOKS_DATA
    : BOOKS_DATA.filter((b) => b.category === selectedCategory);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-28 overflow-hidden mandala-bg border-b border-amber-900/30">
          {/* Glowing Ambient Background Lights */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-600/15 via-orange-600/20 to-yellow-600/15 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Digital Library & Wisdom Portal</span>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="font-devanagari text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gold-gradient leading-tight">
                भारतग्रंथ: शाश्वत ज्ञानमञ्जूषा
              </h1>
              <p className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200/90 tracking-wide">
                Mahabharata • Ramayana • Upanishads • Puranas • Gita • Vedas
              </p>
              <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
                Immerse yourself in verse-by-verse Sanskrit shlokas with authentic Hindi and English translations, commentary, audio recitations, and character genealogy.
              </p>
            </div>

            {/* Central Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto pt-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by verse, topic (e.g. 'Karma', 'Dharma', 'Arjuna', 'Hanuman')..."
                  className="w-full bg-stone-900/90 border-2 golden-border-interactive rounded-2xl py-4 pl-12 pr-32 text-stone-100 text-sm placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 shadow-2xl"
                />
                <Search className="w-5 h-5 text-amber-400 absolute left-4" />
                <button
                  type="submit"
                  className="absolute right-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
                >
                  Explore
                </button>
              </div>
            </form>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Original Devanagari Sanskrit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Verse Audio Recitations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Hindi & English Commentary</span>
              </div>
            </div>
          </div>
        </section>

        {/* SHLOKA OF THE DAY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 rounded-3xl border golden-border p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h2 className="font-cinzel text-sm sm:text-base font-bold text-amber-300 uppercase tracking-widest">
                  Subhashitam • Shloka of the Day (आज का विचार)
                </h2>
              </div>
              <span className="text-xs text-amber-400 font-cinzel font-semibold">
                {shlokaOfTheDay.verseNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <p className="font-devanagari text-xl sm:text-2xl font-bold text-amber-100 leading-relaxed whitespace-pre-line">
                  {shlokaOfTheDay.sanskrit}
                </p>
                <p className="font-devanagari text-sm text-stone-200">
                  {shlokaOfTheDay.hindi}
                </p>
                <p className="text-xs text-stone-400 italic">
                  "{shlokaOfTheDay.english}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end border-t lg:border-t-0 lg:border-l border-amber-900/40 pt-4 lg:pt-0 lg:pl-6">
                <button
                  onClick={() => setSelectedQuoteVerse(shlokaOfTheDay)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Generate Poster Card</span>
                </button>

                <Link
                  to="/read/bhagavad-gita/gita-ch-2"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 text-xs font-bold hover:brightness-110 transition shadow-md"
                >
                  <span>Read Chapter 2</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SCRIPTURES LIBRARY CATALOG */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Granth Sangraha</span>
              </div>
              <h2 className="font-devanagari text-3xl md:text-4xl font-bold text-amber-100">
                Explore Sacred Books & Epics
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20"
                      : "bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800"
                  }`}
                >
                  {cat === "All" ? "All Scriptures" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* SACRED AUDIO CHANTS & STOTRAM LOUNGE */}
        <section id="chants" className="bg-stone-900/60 border-y border-amber-900/30 py-16 mandala-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <Music className="w-4 h-4" />
                  <span>Stotram & Chanting Lounge</span>
                </div>
                <h2 className="font-devanagari text-3xl font-bold text-amber-100">
                  Sacred Chants & Stotrams (स्तोत्र एवं पाठ)
                </h2>
              </div>
              <p className="text-xs text-stone-400 max-w-md">
                Listen to rhythmic recitations of Hanuman Chalisa, Mahamrityunjaya Mantra, Vishnu Sahasranama, and Shiva Tandava with synchronized lyrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AUDIO_CHANTS.map((chant) => (
                <div
                  key={chant.id}
                  className="bg-stone-900 rounded-2xl border golden-border-interactive p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {chant.deity}
                      </span>
                      <span className="text-xs text-stone-400 font-cinzel">{chant.duration}</span>
                    </div>

                    <h3 className="font-devanagari text-xl font-bold text-amber-200">
                      {chant.sanskritTitle}
                    </h3>
                    <p className="font-cinzel text-xs text-amber-400/90 font-semibold">
                      {chant.title}
                    </p>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {chant.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveAudioChant(chant)}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen Recitation & Lyrics</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHARACTER LINEAGE & GENEALOGY SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="flex items-center justify-between border-b border-stone-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
                <Users className="w-4 h-4" />
                <span>Patra Parichay</span>
              </div>
              <h2 className="font-devanagari text-3xl font-bold text-amber-100">
                Key Character Profiles & Lineage (पात्र परिचय)
              </h2>
            </div>

            <Link
              to="/characters"
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
            >
              <span>View All Characters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARACTERS_DATA.map((char) => (
              <div
                key={char.id}
                onClick={() => setActiveCharacter(char)}
                className="group bg-stone-900/80 rounded-2xl border golden-border-interactive p-6 cursor-pointer space-y-4 hover:-translate-y-1 transition shadow-xl"
              >
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

                <div className="flex items-center justify-between border-t border-stone-800/80 pt-3 text-[11px] text-amber-400">
                  <span>{char.title}</span>
                  <span className="underline group-hover:text-amber-300">View Lineage →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Persistent Audio Drawer */}
      <AudioPlayerDrawer currentChant={activeAudioChant} />

      {/* Character Profile Modal */}
      {activeCharacter && (
        <CharacterModal character={activeCharacter} onClose={() => setActiveCharacter(null)} />
      )}

      {/* Quote Card Generator Modal */}
      {selectedQuoteVerse && (
        <QuoteCardModal
          verse={selectedQuoteVerse}
          onClose={() => setSelectedQuoteVerse(null)}
        />
      )}
    </div>
  );
}
