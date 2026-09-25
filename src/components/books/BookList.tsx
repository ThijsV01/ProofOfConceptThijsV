import type { Book } from "../../types/Book";
import BookCard from "./BookCard";
import type { ReadingListItem } from "../../types/ReadingListItem";
import './BookList.css';

type BookListProps = {
    books: Book[];
    readingList: ReadingListItem[];
    onAddToReadingList: (book: Book) => void;
}

function BookList({ books, readingList, onAddToReadingList }: BookListProps) {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    readingList={readingList}
                    onAddToReadingList={onAddToReadingList}
                />
            ))}
        </div>
    );
}

export default BookList;