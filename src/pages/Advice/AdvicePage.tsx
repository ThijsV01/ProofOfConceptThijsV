import { useEffect, useState } from "react";
import type { Book } from "../../types/Book";
import type { ReadingListItem } from "../../types/ReadingListItem";
import BookList from "../../components/books/BookList";
import BookSkeleton from "../../components/books/BookSkeleton";
import Pagination from "../../components/catalog/Pagination";
import {AddToReadingListAPI,GetReadingListAPI} from "../../api/readingListApi";
import { getRecommendedAPI } from "../../api/booksApi";
import "./AdvicePage.css";

function AdvicePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;
  async function loadReadingList() {
    const response = await GetReadingListAPI();
    setReadingList(response.list);
  }
  useEffect(() => {
    async function loadData() {
        setLoading(true);
        setError("");

        try {
            const booksResponse = await getRecommendedAPI();

            setBooks(booksResponse.books);

            await loadReadingList();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("De leesadviezen konden niet worden geladen.");
            }
        } finally {
            setLoading(false);
        }
    }

    loadData();
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

  async function handleAddToReadingList(book: Book) {
    await AddToReadingListAPI(book.id);
    await loadReadingList();
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