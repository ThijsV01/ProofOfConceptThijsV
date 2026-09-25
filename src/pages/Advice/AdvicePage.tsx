import { useEffect, useState } from "react";
import type { Book } from "../../types/Book";
import BookList from "../../components/books/BookList";
import BookSkeleton from "../../components/books/BookSkeleton";
import Pagination from "../../components/catalog/Pagination";
import { mockAdviceBookIds } from "../../data/Advice";
import { mockBooks } from "../../data/Catalog";
import {addToReadingList,getReadingList} from "../../services/readingListStorage";
import "./AdvicePage.css";

function AdvicePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingList, setReadingList] = useState(getReadingList());
  const [currentPage, setCurrentPage] = useState(1);

  const recommendedBooks = mockBooks.filter(book =>
    mockAdviceBookIds.includes(book.id)
);

  const booksPerPage = 6;

  useEffect(() => {
    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      try {
        setBooks(recommendedBooks);
      } catch {
        setError("De leesadviezen konden niet worden geladen.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;

  const paginatedBooks = books.slice(
    startIndex,
    startIndex + booksPerPage
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleAddToReadingList(book: Book) {
    addToReadingList(book);
    setReadingList(getReadingList());
}

  return (
    <div className="advies-page">
      <header className="advies-page-header">
        <h1>Jouw leesadvies</h1>

        <p>
          Op basis van jouw leesprofiel hebben we deze boeken
          voor je geselecteerd.
        </p>
      </header>

      {!loading && !error && books.length > 0 && (
        <div className="advies-results">
          <p>
            {books.length} {books.length === 1 ? "boek" : "boeken"} gevonden
          </p>
        </div>
      )}

      {loading && <BookSkeleton />}

      {!loading && error && (
        <div className="error-message">
          <h2>Leesadvies kon niet worden geladen</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="empty-message">
          <h2>Geen leesadvies gevonden</h2>

          <p>
            We konden op basis van je leesprofiel geen passende
            boeken vinden.
          </p>
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <BookList books={paginatedBooks} readingList={readingList} onAddToReadingList={handleAddToReadingList}/>

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

export default AdvicePage;