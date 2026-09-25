import './BookSkeleton.css';

function BookSkeleton() {
    return (
        <div className="book-list">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    className="book-card skeleton"
                    key={index}
                >
                    <div className="skeleton-title" />
                    <div className="skeleton-description" />
                    <div className="skeleton-description short" />
                </div>
            ))}
        </div>
    );
}

export default BookSkeleton;