import { useState, useEffect, useRef } from "react";
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
  Sparkles,
  User,
  LogOut,
  Shield,
  ChevronDown,
  LogIn
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, isAuthenticated, openLoginModal, openSignupModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

          {/* Desktop Nav Links & Auth */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition ${
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

            {/* User Auth Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-amber-900/40 hover:border-amber-500/50 transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 text-xs font-bold font-cinzel">
                    {user.displayHint.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-stone-200 leading-tight">
                      {user.displayHint}
                    </div>
                    <div className="text-[10px] text-amber-400 font-cinzel tracking-wider uppercase">
                      {user.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-stone-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md z-50 animate-fadeIn">
                    <div className="p-3.5 border-b border-amber-900/30 bg-stone-950/60">
                      <div className="text-xs font-cinzel font-bold text-amber-400">
                        HASHED ACCOUNT
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        ID: {user.id}
                      </div>
                    </div>

                    <div className="p-1.5 space-y-1">
                      <Link
                        to="/bookmarks"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-stone-300 hover:text-amber-400 hover:bg-stone-800/60 transition"
                      >
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        <span>Saved Verses ({bookmarkCount})</span>
                      </Link>

                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-stone-300 hover:text-amber-400 hover:bg-stone-800/60 transition"
                      >
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span>Admin Data Portal</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/30 transition text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-900/40 text-amber-400 hover:text-amber-300 text-sm font-cinzel font-semibold transition shadow-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>SIGN IN</span>
              </button>
            )}

            <Link
              to="/read/bhagavad-gita/gita-ch-2"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 font-semibold text-sm hover:brightness-110 shadow-lg shadow-amber-600/20 transition"
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

          {/* Mobile Auth Button */}
          <div className="p-3 bg-stone-900/60 border border-amber-900/30 rounded-2xl">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 text-xs font-bold font-cinzel">
                    {user.displayHint.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-200">
                      {user.displayHint}
                    </div>
                    <div className="text-[10px] text-amber-400 uppercase font-cinzel">
                      {user.role}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-3 py-1.5 bg-red-950/50 border border-red-900/50 text-red-400 rounded-xl text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLoginModal();
                  }}
                  className="py-2.5 bg-stone-900 border border-amber-900/40 text-amber-400 rounded-xl text-xs font-cinzel font-bold text-center"
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSignupModal();
                  }}
                  className="py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 rounded-xl text-xs font-cinzel font-bold text-center"
                >
                  REGISTER
                </button>
              </div>
            )}
          </div>

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

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 rounded-xl bg-stone-900/70 border border-purple-900/40 text-purple-300 text-sm font-medium"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Admin Portal</span>
            </Link>
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
