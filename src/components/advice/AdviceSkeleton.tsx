import "./AdviceSkeleton.css";

function AdviceSkeleton() {
  return (
    <div
      className="book-skeleton-list"
      aria-busy="true"
      aria-label="Leesadviezen worden geladen"
    >
      {" "}
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className="book-skeleton-card">
          {" "}
          <div className="skeleton skeleton-title"></div>{" "}
          <div className="skeleton skeleton-author"></div>{" "}
          <div className="skeleton skeleton-description"></div>{" "}
          <div className="skeleton skeleton-description"></div>{" "}
          <div className="skeleton skeleton-reason-title"></div>{" "}
          <div className="skeleton skeleton-description"></div>{" "}
          <div className="skeleton skeleton-description-short"></div>{" "}
          <div className="skeleton skeleton-button"></div>{" "}
        </article>
      ))}{" "}
    </div>
  );
}
export default AdviceSkeleton;
