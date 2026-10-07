import "./ReadingListSkeleton.css";
function ReadingListSkeleton() {
  return (
    <div
      className="reading-list-skeleton"
      aria-busy="true"
      aria-label="Leeslijst wordt geladen"
    >
      {" "}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="reading-list-skeleton-item">
          {" "}
          <div className="reading-list-skeleton-info">
            {" "}
            <div className="skeleton skeleton-title"></div>{" "}
            <div className="skeleton skeleton-author"></div>{" "}
            <div className="skeleton skeleton-status"></div>{" "}
          </div>{" "}
          <div className="reading-list-skeleton-actions">
            {" "}
            <div className="skeleton skeleton-button"></div>{" "}
            <div className="skeleton skeleton-button"></div>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
export default ReadingListSkeleton;
