import { useEffect, useMemo, useState } from "react";
import type { Book } from "../../types/Book";
import BookList from "../../components/books/BookList";
import CatalogusFilters from "../../components/catalog/CatalogFilters";
import BookListSkeleton from "../../components/books/BookSkeleton";
import Pagination from "../../components/catalog/Pagination";
import { mockBooks } from "../../data/Catalog";
import {
  addToReadingList,
  getReadingList,
} from "../../services/readingListStorage";
import "./CatalogPage.css";

function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingList, setReadingList] = useState(getReadingList());

  const [languageLevel, setLanguageLevel] = useState("");
  const [genre, setGenre] = useState("");
  const [subject, setSubject] = useState("");
  const [length, setLength] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      try {
        setBooks(mockBooks);
      } catch {
        setError("De leesadviezen konden niet worden geladen.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesLanguageLevel =
        !languageLevel || book.languageLevel === languageLevel;

      const matchesGenre = !genre || book.genre === genre;

      const matchesSubject = !subject || book.subject === subject;

      const matchesLength = !length || book.length === length;

      return (
        matchesLanguageLevel && matchesGenre && matchesSubject && matchesLength
      );
    });
  }, [books, languageLevel, genre, subject, length]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;

  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage,
  );

  function resetFilters() {
    setLanguageLevel("");
    setGenre("");
    setSubject("");
    setLength("");
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleLanguageLevelChange(value: string) {
    setLanguageLevel(value);
    setCurrentPage(1);
  }

  function handleGenreChange(value: string) {
    setGenre(value);
    setCurrentPage(1);
  }

  function handleSubjectChange(value: string) {
    setSubject(value);
    setCurrentPage(1);
  }

  function handleLengthChange(value: string) {
    setLength(value);
    setCurrentPage(1);
  }

  function handleAddToReadingList(book: Book) {
    addToReadingList(book);
    setReadingList(getReadingList());
  }

  return (
    <div className="catalogus-page">
      <div className="page-header">
        <h1>Catalogus</h1>

        <p>Bekijk alle boeken en vind een titel die bij jou past.</p>
      </div>

      <CatalogusFilters
        languageLevel={languageLevel}
        genre={genre}
        subject={subject}
        length={length}
        onLanguageLevelChange={handleLanguageLevelChange}
        onGenreChange={handleGenreChange}
        onSubjectChange={handleSubjectChange}
        onLengthChange={handleLengthChange}
        onReset={resetFilters}
      />

      <div className="catalogus-results">
        <p>{filteredBooks.length} boeken gevonden</p>
      </div>

      {loading && <BookListSkeleton />}

      {!loading && error && <div className="error-message">{error}</div>}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="empty-message">
          <h2>Geen boeken gevonden</h2>
          <p>Probeer andere filters te gebruiken.</p>

          <button type="button" onClick={resetFilters}>
            Filters wissen
          </button>
        </div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <>
          <BookList
            books={paginatedBooks}
            readingList={readingList}
            onAddToReadingList={handleAddToReadingList}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default CatalogPage;
