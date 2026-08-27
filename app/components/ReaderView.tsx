import { useState, useEffect, useMemo } from "react";
import type { Book, Chapter, Verse, ReaderTheme, Bookmark } from "../types/library";
import { QuoteCardModal } from "./QuoteCardModal";
import { fetchParvaData, filterAndPaginateVerses } from "../utils/mahabharataLoader";
import { 
  Volume2, 
  VolumeX, 
  Bookmark as BookmarkIcon, 
  BookmarkCheck, 
  Share2, 
  Type, 
  Palette, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  MessageSquare,
  Search,
  Layers,
  Filter,
  ArrowRight,
  ListOrdered
} from "lucide-react";
import { Link } from "react-router";

interface ReaderViewProps {
  book: Book;
  chapter: Chapter;
}

export function ReaderView({ book, chapter }: ReaderViewProps) {
  const [theme, setTheme] = useState<ReaderTheme>("sandalwood");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg" | "xl">("lg");
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showCommentary, setShowCommentary] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activeAudioVerseId, setActiveAudioVerseId] = useState<string | null>(null);
  const [selectedQuoteVerse, setSelectedQuoteVerse] = useState<Verse | null>(null);
  const [noteVerseId, setNoteVerseId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");

  // Dynamic Verses & Pagination State
  const [dynamicVerses, setDynamicVerses] = useState<Verse[] | null>(null);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubParva, setSelectedSubParva] = useState<string>("all");
  const [jumpVerseInput, setJumpVerseInput] = useState<string>("");

  // Load external dataset if available (e.g., all 10,988 shlokas for Adi Parva)
  useEffect(() => {
    let isMounted = true;
    setIsLoadingVerses(true);
    setCurrentPage(1);
    setSelectedSubParva("all");
    setSearchQuery("");

    fetchParvaData(chapter.id).then((data) => {
      if (isMounted) {
        if (data && data.verses && data.verses.length > 0) {
          setDynamicVerses(data.verses);
        } else {
          setDynamicVerses(null);
        }
        setIsLoadingVerses(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [chapter.id]);

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

  const saveBookmarksToStorage = (updated: Bookmark[]) => {
    setBookmarks(updated);
    localStorage.setItem("bharatgranth_bookmarks", JSON.stringify(updated));
  };

  const isVerseBookmarked = (verseId: string) => {
    return bookmarks.some((b) => b.verseId === verseId);
  };

  const toggleBookmark = (verse: Verse) => {
    if (isVerseBookmarked(verse.id)) {
      const filtered = bookmarks.filter((b) => b.verseId !== verse.id);
      saveBookmarksToStorage(filtered);
    } else {
      const newBm: Bookmark = {
        id: `bm-${Date.now()}`,
        verseId: verse.id,
        bookId: book.id,
        chapterId: chapter.id,
        bookTitle: book.titleSanskrit,
        chapterTitle: chapter.titleSanskrit,
        verseNumber: verse.verseNumber,
        sanskrit: verse.sanskrit,
        translation: verse.hindi || verse.english,
        createdAt: new Date().toLocaleDateString(),
      };
      saveBookmarksToStorage([...bookmarks, newBm]);
    }
  };

  const handleSaveNote = (verseId: string) => {
    const updated = bookmarks.map((b) => {
      if (b.verseId === verseId) {
        return { ...b, note: noteInput };
      }
      return b;
    });
    saveBookmarksToStorage(updated);
    setNoteVerseId(null);
    setNoteInput("");
  };

  const playVerseAudio = (verse: Verse) => {
    if (activeAudioVerseId === verse.id) {
      window.speechSynthesis.cancel();
      setActiveAudioVerseId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(verse.sanskrit);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.lang = "hi-IN";
      utterance.onend = () => setActiveAudioVerseId(null);
      utterance.onerror = () => setActiveAudioVerseId(null);
      window.speechSynthesis.speak(utterance);
      setActiveAudioVerseId(verse.id);
    }
  };

  // Determine active verse dataset (dynamic 10,988 list vs static chapter verses)
  const activeAllVerses = dynamicVerses || chapter.verses;
  const isDynamicDataset = !!dynamicVerses;

  // Filter & Paginate
  const { verses: displayVerses, totalCount, totalPages, currentPage: validCurrentPage, subParvas } = useMemo(() => {
    return filterAndPaginateVerses(
      activeAllVerses,
      currentPage,
      pageSize,
      searchQuery,
      selectedSubParva
    );
  }, [activeAllVerses, currentPage, pageSize, searchQuery, selectedSubParva]);

  // Jump to specific verse number
  const handleJumpToVerse = (e: React.FormEvent) => {
    e.preventDefault();
    const vNum = parseInt(jumpVerseInput.trim(), 10);
    if (isNaN(vNum) || vNum < 1 || vNum > activeAllVerses.length) return;

    // Find page containing vNum
    const targetIdx = activeAllVerses.findIndex((v) => v.verseNumber === vNum);
    if (targetIdx !== -1) {
      const targetPage = Math.floor(targetIdx / pageSize) + 1;
      setSelectedSubParva("all");
      setSearchQuery("");
      setCurrentPage(targetPage);
      setTimeout(() => {
        const el = document.getElementById(`verse-${vNum}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  };

  const fontSizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
  };

  // Find previous and next chapters
  const currentChapterIdx = book.chapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = currentChapterIdx > 0 ? book.chapters[currentChapterIdx - 1] : null;
  const nextChapter =
    currentChapterIdx < book.chapters.length - 1 ? book.chapters[currentChapterIdx + 1] : null;

  return (
    <div className={`min-h-screen theme-${theme} transition-colors duration-300 pb-32 pt-24`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs border-b border-stone-800/60 pb-4">
          <div className="flex items-center gap-2 text-stone-400">
            <Link to="/" className="hover:text-amber-400">
              Library
            </Link>
            <span>/</span>
            <Link to={`/book/${book.id}`} className="hover:text-amber-400 font-semibold">
              {book.titleSanskrit}
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">{chapter.titleSanskrit}</span>
          </div>

          <Link
            to={`/book/${book.id}`}
            className="flex items-center gap-1 text-amber-400 hover:underline font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Chapters</span>
          </Link>
        </div>

        {/* Chapter Header Banner */}
        <div className="text-center space-y-4 py-6 bg-stone-900/60 rounded-3xl border golden-border p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-cinzel text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              {chapter.sectionName || `${book.sectionLabel} #${chapter.number}`}
            </span>
            <span className="font-cinzel text-xs font-bold text-amber-300 bg-orange-950/60 border border-orange-500/30 px-3 py-1 rounded-full flex items-center gap-1">
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{activeAllVerses.length.toLocaleString()} Shlokas</span>
            </span>
          </div>

          <h1 className="font-devanagari text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient leading-tight">
            {chapter.titleSanskrit}
          </h1>

          <p className="font-cinzel text-sm sm:text-base font-semibold text-amber-200">
            {chapter.titleEnglish} • {chapter.titleHindi}
          </p>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed pt-2 border-t border-amber-900/30">
            {chapter.summary}
          </p>
        </div>

        {/* Reader Customization Toolbar */}
        <div className="sticky top-20 z-30 bg-stone-900/90 backdrop-blur-md rounded-2xl border golden-border p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
          {/* Theme Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <Palette className="w-4 h-4 text-amber-400 mr-1" />
            <span className="hidden sm:inline text-stone-400 font-semibold">Theme:</span>
            {[
              { id: "sandalwood", name: "Sandalwood" },
              { id: "dark-temple", name: "Dark Temple" },
              { id: "vedic-parchment", name: "Parchment" },
              { id: "oled-night", name: "OLED" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as ReaderTheme)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === t.id
                    ? "bg-amber-500 text-stone-950 font-bold shadow"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Font Size & Visibility Controls */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg">
              <Type className="w-3.5 h-3.5 text-amber-400 ml-1" />
              {(["sm", "md", "lg", "xl"] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition ${
                    fontSize === sz
                      ? "bg-amber-500 text-stone-950"
                      : "text-stone-400 hover:text-stone-100"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHindi(!showHindi)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  showHindi
                    ? "bg-amber-900/40 border-amber-500 text-amber-300"
                    : "border-stone-800 text-stone-400 opacity-60"
                }`}
                title="Toggle Hindi Translation"
              >
                हिंदी
              </button>

              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition ${
                  showEnglish
                    ? "bg-amber-900/40 border-amber-500 text-amber-300"
                    : "border-stone-800 text-stone-400 opacity-60"
                }`}
                title="Toggle English Translation"
              >
                ENG
              </button>
            </div>
          </div>
        </div>

        {/* Extended Shloka Controls (Search, Jump to Shloka #, Sub-Parva filter) */}
        <div className="bg-stone-900/80 rounded-2xl border golden-border p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={`Search ${activeAllVerses.length.toLocaleString()} shlokas, words or translations...`}
                className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-amber-900/40 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Sub-parva Filter (if applicable) */}
            {subParvas.length > 0 && (
              <div className="sm:col-span-4 relative">
                <Filter className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedSubParva}
                  onChange={(e) => {
                    setSelectedSubParva(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-2 bg-stone-950 border border-amber-900/40 rounded-xl text-xs text-amber-200 focus:outline-none focus:border-amber-500 appearance-none cursor-pointer"
                >
                  <option value="all">All Sub-Parvas ({subParvas.length})</option>
                  {subParvas.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Jump to Verse Number Form */}
            <div className="sm:col-span-2">
              <form onSubmit={handleJumpToVerse} className="flex gap-1">
                <input
                  type="number"
                  min={1}
                  max={activeAllVerses.length}
                  value={jumpVerseInput}
                  onChange={(e) => setJumpVerseInput(e.target.value)}
                  placeholder="Shloka #"
                  className="w-full px-2 py-2 bg-stone-950 border border-amber-900/40 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500 text-center"
                />
                <button
                  type="submit"
                  className="px-2.5 py-2 bg-amber-500 text-stone-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition"
                  title="Jump to Shloka Number"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Dataset Status & Pagination Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-t border-stone-800/80 pt-3">
            <div className="text-stone-400 flex items-center gap-2">
              {isDynamicDataset && (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                  <Layers className="w-3 h-3" /> Full 10,988 Dataset Loaded
                </span>
              )}
              <span>
                Showing <strong className="text-amber-300">{totalCount > 0 ? (validCurrentPage - 1) * pageSize + 1 : 0}</strong>–
                <strong className="text-amber-300">{Math.min(validCurrentPage * pageSize, totalCount)}</strong> of{" "}
                <strong className="text-amber-300">{totalCount.toLocaleString()}</strong> shlokas
              </span>
            </div>

            {/* Page Size Selector & Pagination Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-stone-400 text-[11px]">
                <span>Show:</span>
                {[25, 50, 100, 250].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setPageSize(sz);
                      setCurrentPage(1);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      pageSize === sz
                        ? "bg-amber-500 text-stone-950"
                        : "bg-stone-800 text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    disabled={validCurrentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1 rounded-lg bg-stone-800 text-amber-400 border border-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-cinzel text-stone-300 text-xs px-2">
                    Page <strong>{validCurrentPage}</strong> / {totalPages}
                  </span>
                  <button
                    disabled={validCurrentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1 rounded-lg bg-stone-800 text-amber-400 border border-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoadingVerses && (
          <div className="text-center py-12 space-y-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-cinzel text-amber-400 font-bold">
              Loading 10,988 Shlokas of Adi Parva...
            </p>
          </div>
        )}

        {/* Empty Search Result */}
        {!isLoadingVerses && displayVerses.length === 0 && (
          <div className="text-center py-12 bg-stone-900/40 rounded-3xl border border-stone-800 space-y-3">
            <Search className="w-8 h-8 text-amber-500/50 mx-auto" />
            <p className="text-sm font-semibold text-stone-300">
              No shlokas matched your search filter "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubParva("all");
              }}
              className="px-4 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold hover:bg-amber-500/30"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Shlokas / Verses Section */}
        {!isLoadingVerses && displayVerses.length > 0 && (
          <div className="space-y-8">
            {displayVerses.map((verse) => {
              const bookmarked = isVerseBookmarked(verse.id);
              const isAudioPlaying = activeAudioVerseId === verse.id;

              return (
                <div
                  key={verse.id}
                  id={`verse-${verse.verseNumber}`}
                  className="shloka-card rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 relative transition-all"
                >
                  {/* Verse Header Info & Action Controls */}
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-cinzel text-xs font-bold flex items-center justify-center shadow">
                        #{verse.verseNumber}
                      </span>

                      {(verse as any).subParva && (
                        <span className="font-cinzel text-[11px] font-semibold text-amber-300/80 bg-stone-950 px-2.5 py-0.5 rounded-full border border-amber-900/40">
                          {(verse as any).subParvaHindi || (verse as any).subParva}
                        </span>
                      )}

                      {verse.speaker && (
                        <span className="font-devanagari text-xs sm:text-sm font-bold text-amber-400 bg-amber-950/40 px-3 py-0.5 rounded-full border border-amber-500/30">
                          {verse.speaker}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio Recitation button */}
                      <button
                        onClick={() => playVerseAudio(verse)}
                        className={`p-2 rounded-xl border transition ${
                          isAudioPlaying
                            ? "bg-amber-500 text-stone-950 border-amber-400 animate-pulse"
                            : "bg-stone-800/80 hover:bg-stone-700 text-amber-400 border-stone-700"
                        }`}
                        title="Listen Shloka Recitation"
                      >
                        {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Bookmark Verse button */}
                      <button
                        onClick={() => toggleBookmark(verse)}
                        className={`p-2 rounded-xl border transition ${
                          bookmarked
                            ? "bg-amber-500 text-stone-950 border-amber-400"
                            : "bg-stone-800/80 hover:bg-stone-700 text-stone-300 border-stone-700"
                        }`}
                        title={bookmarked ? "Remove Bookmark" : "Save Shloka"}
                      >
                        {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                      </button>

                      {/* Generate Poster button */}
                      <button
                        onClick={() => setSelectedQuoteVerse(verse)}
                        className="p-2 rounded-xl bg-stone-800/80 hover:bg-amber-600 hover:text-stone-950 text-amber-400 border border-stone-700 transition"
                        title="Share / Create Quote Card"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sanskrit Devanagari Text */}
                  <div className="text-center py-2 space-y-3">
                    <p
                      className={`font-devanagari font-bold leading-relaxed whitespace-pre-line text-amber-200 ${fontSizeClasses[fontSize]}`}
                    >
                      {verse.sanskrit}
                    </p>

                    {verse.transliteration && (
                      <p className="font-cinzel text-xs sm:text-sm text-stone-400 italic font-medium tracking-wide">
                        {verse.transliteration}
                      </p>
                    )}
                  </div>

                  {/* Translations Section */}
                  <div className="space-y-4 border-t border-amber-500/20 pt-5">
                    {/* Hindi Translation */}
                    {showHindi && verse.hindi && (
                      <div className="space-y-1.5 bg-stone-900/40 p-4 rounded-2xl border border-amber-900/20">
                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">
                          हिंदी अनुवाद
                        </span>
                        <p className="font-devanagari text-sm sm:text-base text-stone-200 leading-relaxed">
                          {verse.hindi}
                        </p>
                      </div>
                    )}

                    {/* English Translation */}
                    {showEnglish && verse.english && (
                      <div className="space-y-1.5 bg-stone-900/40 p-4 rounded-2xl border border-stone-800">
                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">
                          English Meaning
                        </span>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                          {verse.english}
                        </p>
                      </div>
                    )}

                    {/* Purport / Commentary */}
                    {showCommentary && verse.commentary && (
                      <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-900/30 space-y-1">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>भावार्थ एवं विस्तृत व्याख्या (Commentary)</span>
                        </span>
                        <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic">
                          {verse.commentary}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Personal Note Editor if bookmarked */}
                  {bookmarked && (
                    <div className="border-t border-stone-800 pt-3">
                      {noteVerseId === verse.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="Write personal reflection or note on this shloka..."
                            className="flex-1 bg-stone-950 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveNote(verse.id)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const bm = bookmarks.find((b) => b.verseId === verse.id);
                            setNoteInput(bm?.note || "");
                            setNoteVerseId(verse.id);
                          }}
                          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>
                            {bookmarks.find((b) => b.verseId === verse.id)?.note
                              ? `Note: ${bookmarks.find((b) => b.verseId === verse.id)?.note}`
                              : "Add study note to this saved verse"}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Pagination Controls for Large Datasets */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/60 p-4 rounded-2xl border golden-border">
            <div className="text-xs text-stone-400">
              Page <strong className="text-amber-300">{validCurrentPage}</strong> of <strong>{totalPages}</strong> ({totalCount.toLocaleString()} shlokas)
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={validCurrentPage <= 1}
                onClick={() => {
                  setCurrentPage(1);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-800 text-amber-400 text-xs font-bold border border-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700"
              >
                First
              </button>
              <button
                disabled={validCurrentPage <= 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500/30"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                disabled={validCurrentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold border border-amber-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
              <button
                disabled={validCurrentPage >= totalPages}
                onClick={() => {
                  setCurrentPage(totalPages);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-800 text-amber-400 text-xs font-bold border border-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700"
              >
                Last
              </button>
            </div>
          </div>
        )}

        {/* Chapter Bottom Navigation */}
        <div className="flex items-center justify-between border-t border-amber-900/40 pt-8">
          {prevChapter ? (
            <Link
              to={`/read/${book.id}/${prevChapter.id}`}
              className="flex items-center gap-2 p-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40 text-xs sm:text-sm font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: {prevChapter.titleSanskrit}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link
              to={`/read/${book.id}/${nextChapter.id}`}
              className="flex items-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950 text-xs sm:text-sm font-bold shadow-lg transition hover:brightness-110"
            >
              <span>Next: {nextChapter.titleSanskrit}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Quote Card Generator Modal */}
      {selectedQuoteVerse && (
        <QuoteCardModal
          verse={selectedQuoteVerse}
          book={book}
          onClose={() => setSelectedQuoteVerse(null)}
        />
      )}
    </div>
  );
}
