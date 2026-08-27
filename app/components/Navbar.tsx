import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Users, 
  Music, 
  Menu, 
  X, 
  Flame, 
  Sparkles 
} from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Read saved bookmarks count from LocalStorage
    try {
      const saved = localStorage.getItem("bharatgranth_bookmarks");
      if (saved) {
        const parsed = JSON.parse(saved);
        setBookmarkCount(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch (e) {
      setBookmarkCount(0);
    }
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Library", path: "/", icon: BookOpen },
    { name: "Audio Chants", path: "/#chants", icon: Music },
    { name: "Characters", path: "/characters", icon: Users },
    { name: "Saved Verses", path: "/bookmarks", icon: Bookmark, badge: bookmarkCount },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-stone-950/90 backdrop-blur-md border-b border-amber-900/40 shadow-xl py-3"
          : "bg-gradient-to-b from-stone-950 via-stone-950/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
              <span className="font-yatra text-stone-950 text-2xl leading-none">ॐ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-rozha text-2xl text-gold-gradient tracking-wide leading-none">
                  भारतग्रंथ
                </span>
                <span className="font-cinzel text-xs font-bold text-amber-500/80 border border-amber-500/30 px-1.5 py-0.5 rounded uppercase tracking-widest hidden sm:inline-block">
                  Sacred
                </span>
              </div>
              <p className="font-cinzel text-[10px] text-stone-400 tracking-widest uppercase">
                Digital Vedic Library
              </p>
            </div>
          </Link>

          {/* Center Search Input */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Shlokas, Gita, Ramayana, Mahabharata..."
                className="w-full bg-stone-900/90 border border-amber-900/40 rounded-full py-2 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
              />
              <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-2.5" />
            </div>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "text-stone-300 hover:text-amber-400 hover:bg-stone-900/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="bg-amber-500 text-stone-950 text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              to="/read/bhagavad-gita/gita-ch-2"
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 font-semibold text-sm hover:brightness-110 shadow-lg shadow-amber-600/20 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Read Gita</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/95 border-b border-amber-900/40 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scriptures..."
              className="w-full bg-stone-900 border border-amber-900/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-stone-200 text-sm font-medium hover:border-amber-500/40"
                >
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span>{link.name}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-auto bg-amber-500 text-stone-950 text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <Link
            to="/read/bhagavad-gita/gita-ch-2"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 font-bold shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Open Bhagavad Gita Reader</span>
          </Link>
        </div>
      )}
    </header>
  );
}
