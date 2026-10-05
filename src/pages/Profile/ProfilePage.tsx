import { useEffect, useState } from "react";
import type { ReadingProfile } from "../../types/Profile";
import ProfileOverview from "../../components/profile/ProfileOverview";
import ProfileForm from "../../components/profile/ProfileForm";
import {getProfile, updateProfile, createProfile} from "../../api/profileApi"
import "../Profile/ProfilePage.css";

const emptyProfile: ReadingProfile = {
  languageLevel: "",
  genre: [],
  subject: [],
  length: "",
  readingGoal:""
};

function ProfilePage() {
  const [profile, setProfile] = useState<ReadingProfile>(emptyProfile);
    const [originalProfile, setOriginalProfile] =
        useState<ReadingProfile>(emptyProfile);

    const [hasProfile, setHasProfile] = useState(false);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfile();
                setProfile(data);
                setOriginalProfile(data);
                setHasProfile(true);
            } catch (error) {
                console.log("Geen profiel gevonden:", error);
                setHasProfile(false);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

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
console.log(profile);
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

            setEditing(false);
        } catch (error) {
            console.error("Profiel opslaan mislukt:", error);
            alert("Het opslaan van je profiel is mislukt.");
        }
    };

  if (loading) {
        return <p>Profiel laden...</p>;
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
                <ProfileOverview
                    profile={profile}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
}

export default ProfilePage;
