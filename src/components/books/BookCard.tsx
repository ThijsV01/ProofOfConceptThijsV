import type { Book } from "../../types/Book";
import type { ReadingListItem } from "../../types/ReadingListItem";
import './BookCard.css';

type BookCardProps = {
  book: Book;
  readingList: ReadingListItem[];
  onAddToReadingList: (book: Book) => void;
};

function BookCard({
  book,
  readingList,
  onAddToReadingList
}: BookCardProps) {

  const isInReadingList = readingList.some(
    (item) => item.book.id === book.id
  );

  return (
    <article className="book-card">
      <div className="book-card-content">

        <div className="book-card-header">
          <h2>{book.title}</h2>

          <button
            className="reading-list-button"
            type="button"
            onClick={() => onAddToReadingList(book)}
            disabled={isInReadingList}
          >
            {isInReadingList ? "Op leeslijst" : "+ Leeslijst"}
          </button>
        </div>

        <p className="book-author">{book.author}</p>

        <p className="book-description">
          {book.description}
        </p>

      </div>
    </article>
  );
}

export default BookCard;