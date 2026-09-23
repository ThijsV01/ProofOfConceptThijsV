import { useEffect, useState } from "react";
import type { ReadingProfile } from "../../types/Profile";
import "../Profile/ProfilePage.css";
import ProfileOverview from "../../components/profile/ProfileOverview";
import ProfileForm from "../../components/profile/ProfileForm";

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
      <h1>Leesprofiel</h1>
      {hasProfile && !editing ? (
      <p>Bekijk hieronder het leesprofiel. <br></br>
        Om dit profiel aan te passen dien je onderaan op de 'Bewerken' knop te klikken.</p>
      ):(
      <p>Beantwoord de vragen om jouw leesprofiel samen te stellen.</p>
      )}
      {saved && (
        <div className="success-message">Je leesprofiel is opgeslagen!</div>
      )}

      {hasProfile && !editing ? (
        <ProfileOverview profile={profile} onEdit={handleEdit} />
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
