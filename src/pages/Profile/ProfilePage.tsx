import { useEffect, useState } from "react";
import type { ReadingProfile } from "../../types/Profile";
import ProfileOverview from "../../components/profile/ProfileOverview";
import ProfileForm from "../../components/profile/ProfileForm";
import { getProfile, updateProfile, createProfile } from "../../api/profileApi";
import ProfileSkeleton from "../../components/profile/ProfileSkeleton"
import "../Profile/ProfilePage.css";

const emptyProfile: ReadingProfile = {
  languageLevel: "",
  genre: [],
  subject: [],
  length: "",
  readingGoal: "",
};

const PROFILE_DRAFT_KEY = "profile-draft";

function ProfilePage() {
  const [profile, setProfile] = useState<ReadingProfile>(emptyProfile);

  const [originalProfile, setOriginalProfile] =
    useState<ReadingProfile>(emptyProfile);

  const [hasProfile, setHasProfile] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const savedDraft = sessionStorage.getItem(PROFILE_DRAFT_KEY);

      try {
        const data = await getProfile();

        setHasProfile(true);
        setOriginalProfile(data);

        if (savedDraft) {
          try {
            const draft = JSON.parse(savedDraft) as ReadingProfile;

            // Er zijn onafgemaakte wijzigingen.
            // Die gaan voor op het opgeslagen profiel.
            setProfile(draft);
            setEditing(true);
          } catch {
            sessionStorage.removeItem(PROFILE_DRAFT_KEY);

            setProfile(data);
            setEditing(false);
          }
        } else {
          setProfile(data);
          setEditing(false);
        }
      } catch (error) {
        console.log("Geen profiel gevonden:", error);

        if (savedDraft) {
          try {
            const draft = JSON.parse(savedDraft) as ReadingProfile;

            setProfile(draft);
            setOriginalProfile(emptyProfile);
            setHasProfile(false);
            setEditing(true);
          } catch {
            sessionStorage.removeItem(PROFILE_DRAFT_KEY);

            setProfile(emptyProfile);
            setOriginalProfile(emptyProfile);
            setHasProfile(false);
            setEditing(false);
          }
        } else {
          setProfile(emptyProfile);
          setOriginalProfile(emptyProfile);
          setHasProfile(false);
          setEditing(false);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    // Alleen bewaren als de gebruiker daadwerkelijk
    // een profiel aan het invullen of wijzigen is.
    if (editing || !hasProfile) {
      sessionStorage.setItem(PROFILE_DRAFT_KEY, JSON.stringify(profile));
    }
  }, [profile, editing, hasProfile, loading]);

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

    sessionStorage.removeItem(PROFILE_DRAFT_KEY);
  };

  const handleSave = async () => {
    if (
      profile.languageLevel === "" ||
      profile.genre.length === 0 ||
      profile.subject.length === 0 ||
      profile.length === "" ||
      profile.readingGoal === ""
    ) {
      alert("Vul alle verplichte vragen in.");
      return;
    }

    try {
      if (hasProfile) {
        const updatedProfile = await updateProfile(profile);

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
      } else {
        const createdProfile = await createProfile(profile);

        setProfile(createdProfile);
        setOriginalProfile(createdProfile);
        setHasProfile(true);
      }

      // Profiel is definitief opgeslagen.
      sessionStorage.removeItem(PROFILE_DRAFT_KEY);

      setEditing(false);
    } catch (error) {
      console.error("Profiel opslaan mislukt:", error);

      alert("Het opslaan van je profiel is mislukt.");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        {" "}
        <h1>Mijn leesprofiel</h1> <ProfileSkeleton />{" "}
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>Mijn leesprofiel</h1>

      {!hasProfile || editing ? (
        <ProfileForm
          profile={profile}
          onChange={setProfile}
          onSubmit={handleSave}
          onCancel={handleCancel}
          isEditing={editing}
        />
      ) : (
        <ProfileOverview profile={profile} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default ProfilePage;
