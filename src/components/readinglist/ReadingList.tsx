import type { ReadingListItem as ReadingListItemType } from "../../types/ReadingListItem";
import ReadingListItem from "./ReadingListItem";
import { Link } from "react-router-dom";

type Props = {
  items: ReadingListItemType[];
  onToggleRead: (bookId: number) => void;
  onRemove: (bookId: number) => void;
};

function ReadingList({ items, onToggleRead, onRemove }: Props) {
  if (items.length === 0) {
    return (
      <div className="empty-reading-list">
        <h2>Je leeslijst is nog leeg</h2>
        <p>
          Voeg een boek toe vanuit de <Link to="/catalog">catalogus</Link> of je{" "}
          <Link to="/advice">leesadvies.</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="reading-list">
      {items.map((item) => (
        <ReadingListItem
          key={item.book.id}
          item={item}
          onToggleRead={onToggleRead}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default ReadingList;
