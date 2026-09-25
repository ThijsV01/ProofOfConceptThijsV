import type { ReadingProfile } from "../../types/Profile";
import "./ProfileOverview.css";

type ProfileOverviewProps = {
  profile: ReadingProfile;
  onEdit: () => void;
};

function ProfileOverview({
  profile,
  onEdit,
}: ProfileOverviewProps) {
  return (
    <div>
      <div className="profile-grid">
        <div className="profile-card">
          <h3>Genres fictie</h3>

          <div className="profile-values">
            {profile.fictionGenre.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Genres waargebeurd</h3>

          <div className="profile-values">
            {profile.nonFictionGenre.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Onderwerpen</h3>

          <div className="profile-values">
            {profile.subjects.map((subject) => (
              <span key={subject}>{subject}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Moeilijkheid</h3>
          <p>{profile.difficulty}</p>
        </div>

        <div className="profile-card">
          <h3>Lengte</h3>
          <p>{profile.length}</p>
        </div>

        <div className="profile-card">
          <h3>Wat wil je ervaren?</h3>

          <div className="profile-values">
            {profile.readingExperience.map((experience) => (
              <span key={experience}>{experience}</span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Fictie of waargebeurd</h3>
          <p>{profile.fictionPreference}</p>
        </div>

        <div className="profile-card">
          <h3>Hoofdpersoon</h3>
          <p>{profile.mainCharacter}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button
          type="button"
          onClick={onEdit}
          className="edit-profile-button"
        >
          Profiel bewerken
        </button>
      </div>
    </div>
  );
}

export default ProfileOverview;
