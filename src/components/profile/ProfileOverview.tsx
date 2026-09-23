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
    <div className="profile-overview">
      <h2>Jouw leesprofiel</h2>

      <div className="profile-section">
        <h3>Genres fictie</h3>

        {profile.fictionGenre.map((genre) => (
          <span key={genre} className="profile-value">
            {genre}
          </span>
        ))}
      </div>

      <div className="profile-section">
        <h3>Genres waargebeurd</h3>

        {profile.nonFictionGenre.map((genre) => (
          <span key={genre} className="profile-value">
            {genre}
          </span>
        ))}
      </div>

      <div className="profile-section">
        <h3>Onderwerpen</h3>

        {profile.subjects.map((subject) => (
          <span key={subject} className="profile-value">
            {subject}
          </span>
        ))}
      </div>

      <div className="profile-section">
        <h3>Moeilijkheid</h3>

        <span className="profile-value">
          {profile.difficulty}
        </span>
      </div>

      <div className="profile-section">
        <h3>Lengte</h3>

        <span className="profile-value">
          {profile.length}
        </span>
      </div>

      <div className="profile-section">
        <h3>Wat wil je ervaren?</h3>

        {profile.readingExperience.map((experience) => (
          <span key={experience} className="profile-value">
            {experience}
          </span>
        ))}
      </div>

      <div className="profile-section">
        <h3>Fictie of waargebeurd</h3>

        <span className="profile-value">
          {profile.fictionPreference}
        </span>
      </div>

      <div className="profile-section">
        <h3>Hoofdpersoon</h3>

        <span className="profile-value">
          {profile.mainCharacter}
        </span>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="edit-profile-button"
      >
        Profiel bewerken
      </button>
    </div>
  );
}

export default ProfileOverview;