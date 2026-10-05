import type { ReadingListItemWithBook } from "../../types/ReadingListItemWithBook";

type Props = {
    item: ReadingListItemWithBook;
    onToggleRead: (itemId: string) => void;
    onRemove: (itemId: string) => void;
};

function ReadingListItem({
    item,
    onToggleRead,
    onRemove
}: Props) {
    if (!item.book) {
        return (
            <div className="reading-list-item">
                <p>Boek niet gevonden.</p>
            </div>
        );
    }
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
                    onClick={() => onToggleRead(item.id)}
                >
                    {item.isRead
                        ? "Markeer als niet gelezen"
                        : "Markeer als gelezen"}
                </button>

                <button
                    onClick={() => onRemove(item.id)}
                >
                    Verwijderen
                </button>
            </div>
        </div>
    );
}

export default ReadingListItem;