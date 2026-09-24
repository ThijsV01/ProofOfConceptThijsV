import type { Book } from "../../types/Book";

type BookCardProps = {
  book: Book;
  onAddToReadingList?: (book: Book) => void;
};

function BookCard({ book, onAddToReadingList }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-card-content">
        <h2>{book.title}</h2>

        <p className="book-author">{book.author}</p>

        <p className="book-description">{book.description}</p>
        <button onClick={() => onAddToReadingList?.(book)}>
          + Aan leeslijst
        </button>
      </div>
    </article>
  );
}

export default BookCard;
