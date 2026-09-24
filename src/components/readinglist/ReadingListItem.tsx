import type { ReadingListItem as ReadingListItemType } from "../../types/ReadingListItem";

type Props = {
    item: ReadingListItemType;
    onToggleRead: (bookId: number) => void;
    onRemove: (bookId: number) => void;
};

function ReadingListItem({
    item,
    onToggleRead,
    onRemove
}: Props) {
    return (
        <div className="reading-list-item">
            <div className="reading-list-info">
                <h3>{item.book.title}</h3>

                <p>{item.book.author}</p>

                <span>
                    {item.isRead ? "Gelezen" : "Nog niet gelezen"}
                </span>
            </div>

            <div className="reading-list-actions">
                <button
                    onClick={() => onToggleRead(item.book.id)}
                >
                    {item.isRead
                        ? "Markeer als niet gelezen"
                        : "Markeer als gelezen"}
                </button>

                <button
                    onClick={() => onRemove(item.book.id)}
                >
                    Verwijderen
                </button>
            </div>
        </div>
    );
}

export default ReadingListItem;