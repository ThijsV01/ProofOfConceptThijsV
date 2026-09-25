import { useEffect, useState } from "react";
import type { ReadingProfile } from "../../types/Profile";
import ProfileOverview from "../../components/profile/ProfileOverview";
import ProfileForm from "../../components/profile/ProfileForm";
import "../Profile/ProfilePage.css";

const emptyProfile: ReadingProfile = {
  fictionGenre: [],
  nonFictionGenre: [],
  subjects: [],
  difficulty: "",
  length: "",
  readingExperience: [],
  fictionPreference: "",
  mainCharacter: "",
};

function ProfilePage() {
  const [profile, setProfile] = useState<ReadingProfile>(emptyProfile);
  const [originalProfile, setOriginalProfile] = useState<ReadingProfile>(emptyProfile);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [editing, setEditing] = useState(false);

  // Profiel uit sessionStorage laden
  useEffect(() => {
    const savedProfile = sessionStorage.getItem("readingProfile");

    const profileSaved = sessionStorage.getItem("profileSaved");

    if (savedProfile) {
      const parsedProfile: ReadingProfile = JSON.parse(savedProfile);

      setProfile(parsedProfile);
      setOriginalProfile(parsedProfile);
    }

    if (profileSaved === "true") {
      setHasProfile(true);
    }

    setLoaded(true);
  }, []);

  // Profiel tijdelijk bewaren
  useEffect(() => {
    if (!loaded || editing) {
      return;
    }

    sessionStorage.setItem("readingProfile", JSON.stringify(profile));
  }, [profile, loaded, editing]);

  const handleEdit = () => {
    setOriginalProfile(profile);
    setEditing(true);
  };

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Je hebt onopgeslagen wijzigingen. Weet je zeker dat je deze wilt annuleren?",
    );

    if (!confirmed) {
      return;
    }

    setProfile(originalProfile);
    setEditing(false);
  };

  const handleSave = () => {
    if (
      profile.fictionGenre.length === 0 ||
      profile.nonFictionGenre.length === 0 ||
      profile.subjects.length === 0 ||
      profile.difficulty === "" ||
      profile.length === "" ||
      profile.readingExperience.length === 0
    ) {
      alert("Vul alle verplichte vragen in.");
      return;
    }

    sessionStorage.setItem("readingProfile", JSON.stringify(profile));
    setOriginalProfile(profile);
    setSaved(true);
    setHasProfile(true);
    setEditing(false);

    sessionStorage.setItem("profileSaved", "true");
    // Hier komt later de backend-call.
  };

  return (
  <div className="profile-page">
    <div className="profile-page-header">
  <h1>Leesprofiel</h1>

  {hasProfile && !editing ? (
    <p>Bekijk en pas jouw leesvoorkeuren aan.</p>
  ) : (
    <p>Vul jouw leesvoorkeuren in.</p>
  )}
</div>

    {saved && (
      <div className="success-message">
        <span>✓</span>
        Je leesprofiel is opgeslagen!
      </div>
    )}

    {hasProfile && !editing ? (
      <ProfileOverview
        profile={profile}
        onEdit={handleEdit}
      />
    ) : (
      <ProfileForm
        profile={profile}
        onChange={setProfile}
        onSubmit={handleSave}
        onCancel={handleCancel}
        isEditing={editing}
      />
    )}
  </div>
);
}

export default ProfilePage;
