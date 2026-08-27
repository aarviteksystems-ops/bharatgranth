import { Link } from "react-router";
import { BookOpen, Heart, Shield, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-amber-900/30 pt-16 pb-12 text-stone-400 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-stone-950 font-yatra text-2xl shadow-lg">
                ॐ
              </div>
              <span className="font-rozha text-2xl text-gold-gradient">भारतग्रंथ</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400">
              A modern digital archive preserving the sublime wisdom of Mahabharata, Ramayana, Upanishads, Puranas, Vedas, and Bhagavad Gita with authentic Sanskrit verses & commentary.
            </p>
            <div className="text-xs font-devanagari text-amber-500/80 italic">
              "विद्ययाऽमृतमश्नुते" — (Through knowledge one attains immortality)
            </div>
          </div>

          {/* Col 2: Sacred Scriptures */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
              Sacred Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/book/mahabharata" className="hover:text-amber-400 transition">
                  Mahabharata (महाभारत)
                </Link>
              </li>
              <li>
                <Link to="/book/ramayana" className="hover:text-amber-400 transition">
                  Ramayana (रामायण)
                </Link>
              </li>
              <li>
                <Link to="/book/bhagavad-gita" className="hover:text-amber-400 transition">
                  Bhagavad Gita (भगवद्गीता)
                </Link>
              </li>
              <li>
                <Link to="/book/upanishads" className="hover:text-amber-400 transition">
                  Principal Upanishads (उपनिषद्)
                </Link>
              </li>
              <li>
                <Link to="/book/puranas" className="hover:text-amber-400 transition">
                  18 Maha-Puranas (पुराण)
                </Link>
              </li>
              <li>
                <Link to="/book/vedas" className="hover:text-amber-400 transition">
                  Vedic Suktas (वेद)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
              Explorer & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/characters" className="hover:text-amber-400 transition">
                  Character Lineage & Profiles
                </Link>
              </li>
              <li>
                <Link to="/#chants" className="hover:text-amber-400 transition">
                  Stotram & Chanting Audio
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-amber-400 transition">
                  Saved Verses & Study Notes
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-amber-400 transition">
                  Universal Shloka Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Shanti Prayer */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
              Universal Peace Invocation
            </h4>
            <div className="bg-stone-900/80 border border-amber-900/30 rounded-xl p-4 space-y-2">
              <p className="font-devanagari text-xs text-amber-200 leading-relaxed">
                सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।<br />
                सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
              </p>
              <p className="text-[11px] text-stone-400 italic">
                May all beings be happy; may all be healthy; may all see good; may none suffer.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} BharatGranth Digital Library. Open Knowledge Preservation.</p>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Preserving Eternal Vedic Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
