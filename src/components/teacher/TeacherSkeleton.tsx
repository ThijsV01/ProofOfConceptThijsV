import "./TeacherSkeleton.css";

export function StudentListSkeleton() {
  return (
    <div
      className="teacher-student-skeleton"
      aria-busy="true"
      aria-label="Studenten worden geladen"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="student-skeleton-card">
          {" "}
          <div className="skeleton skeleton-student-name"></div>{" "}
          <div className="skeleton skeleton-student-email"></div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}

export function ReadingListSkeleton() {
  return (
    <div
      className="teacher-reading-list-skeleton"
      aria-busy="true"
      aria-label="Leeslijst wordt geladen"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="teacher-reading-skeleton-item">
          {" "}
          <div className="teacher-reading-skeleton-info">
            {" "}
            <div className="skeleton skeleton-book-title"></div>{" "}
            <div className="skeleton skeleton-book-description"></div>{" "}
            <div className="skeleton skeleton-book-description-short"></div>{" "}
          </div>
          <div className="skeleton skeleton-delete-button"></div>
        </div>
      ))}
    </div>
  );
}

export function CatalogusSkeleton() {
  return (
    <div
      className="teacher-catalog-skeleton"
      aria-busy="true"
      aria-label="Catalogus wordt geladen"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="teacher-book-skeleton-card">
          {" "}
          <div className="skeleton skeleton-book-card-title"></div>{" "}
          <div className="skeleton skeleton-book-card-author"></div>{" "}
          <div className="skeleton skeleton-book-card-description"></div>{" "}
          <div className="skeleton skeleton-book-card-description"></div>{" "}
          <div className="skeleton skeleton-book-card-button"></div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
