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
          <h3>Taalniveau</h3>
          <p>{profile.languageLevel}</p>
        </div>

        <div className="profile-card">
          <h3>Genres</h3>

          <div className="profile-values">
            {profile.genre.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Onderwerpen</h3>

          <div className="profile-values">
            {profile.subject.map((subject) => (
              <span key={subject}>{subject}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Lengte</h3>
          <p>{profile.length}</p>
        </div>
        <div className="profile-card">
          <h3>Leesdoel</h3>

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
