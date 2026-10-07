import type { ReadingProfile } from "../../types/Profile";
import "./ProfileOverview.css";

type ProfileOverviewProps = {
  profile: ReadingProfile;
  onEdit: () => void;
};

function ProfileOverview({ profile, onEdit }: ProfileOverviewProps) {
  return (
    <div>
      <div className="profile-grid">
        <div className="profile-card">
          <h2>Taalniveau</h2>
          <p>{profile.languageLevel}</p>
        </div>

        <div className="profile-card">
          <h2>Genres</h2>

          <div className="profile-values">
            {profile.genre.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h2>Onderwerpen</h2>

          <div className="profile-values">
            {profile.subject.map((subject) => (
              <span key={subject}>{subject}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h2>Lengte</h2>
          <p>{profile.length}</p>
        </div>
        <div className="profile-card">
          <h2>Leesdoel</h2>

          {profile.readingGoal}
        </div>
      </div>

      <div className="profile-actions">
        <button type="button" onClick={onEdit} className="edit-profile-button">
          Profiel bewerken
        </button>
      </div>
    </div>
  );
}

export default ProfileOverview;
