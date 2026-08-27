import { useParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ReaderView } from "../components/ReaderView";
import { AudioPlayerDrawer } from "../components/AudioPlayerDrawer";
import { BOOKS_DATA } from "../data/booksData";

export default function ChapterReaderPage() {
  const { bookId, chapterId } = useParams();

  const book = BOOKS_DATA.find((b) => b.id === bookId) || BOOKS_DATA[0];
  const chapter =
    book.chapters.find((c) => c.id === chapterId) || book.chapters[0];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <ReaderView book={book} chapter={chapter} />
      </main>

      <Footer />
      <AudioPlayerDrawer />
    </div>
  );
}
