import "./ProfileSkeleton.css";
function ProfileSkeleton() {
  return (
    <div
      className="profile-skeleton"
      aria-busy="true"
      aria-label="Profiel wordt geladen"
    >
      {" "}
      <div className="profile-skeleton-grid">
        {" "}
        <div className="profile-skeleton-card">
          {" "}
          <div className="skeleton skeleton-title"></div>{" "}
          <div className="skeleton skeleton-text"></div>{" "}
        </div>{" "}
        <div className="profile-skeleton-card">
          {" "}
          <div className="skeleton skeleton-title"></div>{" "}
          <div className="profile-skeleton-values">
            {" "}
            <div className="skeleton skeleton-tag"></div>{" "}
            <div className="skeleton skeleton-tag"></div>{" "}
            <div className="skeleton skeleton-tag-short"></div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="profile-skeleton-card">
          {" "}
          <div className="skeleton skeleton-title"></div>{" "}
          <div className="profile-skeleton-values">
            {" "}
            <div className="skeleton skeleton-tag"></div>{" "}
            <div className="skeleton skeleton-tag"></div>{" "}
            <div className="skeleton skeleton-tag-short"></div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="profile-skeleton-card">
          {" "}
          <div className="skeleton skeleton-title"></div>{" "}
          <div className="skeleton skeleton-text"></div>{" "}
        </div>{" "}
        <div className="profile-skeleton-card">
          {" "}
          <div className="skeleton skeleton-title"></div>{" "}
          <div className="skeleton skeleton-reading-goal"></div>{" "}
          <div className="skeleton skeleton-reading-goal-short"></div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="profile-skeleton-button"></div>{" "}
    </div>
  );
}
export default ProfileSkeleton;
