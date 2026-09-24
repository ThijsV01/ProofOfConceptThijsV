import type { Book } from "../../types/Book";
import BookCard from "./BookCard";

type BookListProps = {
    books: Book[];
    onAddToReadingList?: (book: Book) => void;
}

function BookList({ books, onAddToReadingList }: BookListProps) {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    onAddToReadingList={onAddToReadingList}
                />
            ))}
        </div>
    );
}

export default BookList;