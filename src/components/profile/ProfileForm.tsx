import type { ReadingProfile } from "../../types/Profile";
import "./ProfileForm.css";

type ProfileFormProps = {
  profile: ReadingProfile;
  onChange: (profile: ReadingProfile) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
};

function ProfileForm({
  profile,
  onChange,
  onSubmit,
  onCancel,
  isEditing
}: ProfileFormProps) {
  const handleCheckboxChange = (
    field:
      | "fictionGenre"
      | "nonFictionGenre"
      | "subjects"
      | "readingExperience",
    value: string,
    checked: boolean,
  ) => {
    const currentValues = profile[field];

    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    onChange({
      ...profile,
      [field]: newValues,
    });
  };

  return (
    <form
      className="profile-form-card"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-group">
        <h2>Welk genre (fictie) spreekt je aan? *</h2>

        {[
          ["spanning", "Spanning"],
          ["horror", "Horror"],
          ["humor", "Humor"],
          ["liefde", "Liefde"],
          ["vriendschap", "Vriendschap"],
          ["fantasy", "Fantasy"],
          ["science-fiction", "Science fiction"],
          ["geschiedenis", "Geschiedenis"],
          ["oorlog", "Oorlog"],
          ["stripboek", "Stripboek"],
          ["gedichtenbundel", "Gedichtenbundel"],
          ["social-media", "Bekend van social media"],
        ].map(([value, label]) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              checked={profile.fictionGenre.includes(value)}
              onChange={(event) =>
                handleCheckboxChange(
                  "fictionGenre",
                  value,
                  event.target.checked,
                )
              }
            />
            {label}
          </label>
        ))}
      </div>

      <div className="form-group">
        <h2>Welk genre (waargebeurd) spreekt je aan? *</h2>

        {[
          ["autobiografie", "(auto)biografie"],
          ["geschiedenis", "Geschiedenis"],
          ["politiek", "Politiek"],
          ["beroepsgericht", "Beroepsgericht"],
          ["zelfhulpboeken", "Zelfhulpboeken"],
          ["waargebeurde-verhalen", "Waargebeurde verhalen"],
          ["informatief", "Informatief"],
          ["social-media", "Bekend van social media"],
        ].map(([value, label]) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              checked={profile.nonFictionGenre.includes(value)}
              onChange={(event) =>
                handleCheckboxChange(
                  "nonFictionGenre",
                  value,
                  event.target.checked,
                )
              }
            />
            {label}
          </label>
        ))}
      </div>
      <div className="form-group">
        <h2>Over welke onderwerpen zou je willen lezen? *</h2>

        {[
          ["sport", "Sport of andere hobby's"],
          ["geld", "Geld"],
          ["school", "School"],
          ["technologie", "Technologie"],
          ["liefde", "Liefde"],
          ["vriendschap", "Vriendschap"],
          ["cultuur", "Cultuur"],
          ["dieren", "Dieren"],
          ["games", "Games"],
        ].map(([value, label]) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              checked={profile.subjects.includes(value)}
              onChange={(event) =>
                handleCheckboxChange("subjects", value, event.target.checked)
              }
            />
            {label}
          </label>
        ))}
      </div>
      <div className="form-group">
        <h2>Hoe moeilijk mag het zijn? *</h2>

        <label>
          <input
            type="radio"
            name="difficulty"
            value="makkelijk"
            checked={profile.difficulty === "makkelijk"}
            onChange={(event) =>
              onChange({
                ...profile,
                difficulty: event.target.value,
              })
            }
          />
          Makkelijk
        </label>

        <label>
          <input
            type="radio"
            name="difficulty"
            value="gemiddeld"
            checked={profile.difficulty === "gemiddeld"}
            onChange={(event) =>
              onChange({
                ...profile,
                difficulty: event.target.value,
              })
            }
          />
          Gemiddeld
        </label>

        <label>
          <input
            type="radio"
            name="difficulty"
            value="uitdagend"
            checked={profile.difficulty === "uitdagend"}
            onChange={(event) =>
              onChange({
                ...profile,
                difficulty: event.target.value,
              })
            }
          />
          Uitdagend
        </label>
      </div>
      <div className="form-group">
        <h2>Hoe lang mag het zijn? *</h2>

        <label>
          <input
            type="radio"
            name="length"
            value="kort"
            checked={profile.length === "kort"}
            onChange={(event) =>
              onChange({
                ...profile,
                length: event.target.value,
              })
            }
          />
          Korte verhalen of teksten
        </label>

        <label>
          <input
            type="radio"
            name="length"
            value="middel"
            checked={profile.length === "middel"}
            onChange={(event) =>
              onChange({
                ...profile,
                length: event.target.value,
              })
            }
          />
          Middel
        </label>

        <label>
          <input
            type="radio"
            name="length"
            value="lang"
            checked={profile.length === "lang"}
            onChange={(event) =>
              onChange({
                ...profile,
                length: event.target.value,
              })
            }
          />
          Lang
        </label>
      </div>
      <div className="form-group">
        <h2>Als ik lees, dan wil ik dit voelen of ervaren: *</h2>

        {[
          ["spanning", "Spanning"],
          ["ontspanning", "Ontspanning"],
          ["drama", "Drama"],
          ["humor", "Humor"],
          ["sensatie", "Sensatie"],
          ["iets-nieuws-leren", "Iets nieuws leren"],
          ["herkenning", "Herkenning"],
        ].map(([value, label]) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              checked={profile.readingExperience.includes(value)}
              onChange={(event) =>
                handleCheckboxChange(
                  "readingExperience",
                  value,
                  event.target.checked,
                )
              }
            />
            {label}
          </label>
        ))}
      </div>
      <div className="form-group">
        <h2>Wil je liever een waargebeurd verhaal of fictie?</h2>

        <label>
          <input
            type="radio"
            name="fictionPreference"
            value="waargebeurd"
            checked={profile.fictionPreference === "waargebeurd"}
            onChange={(event) =>
              onChange({
                ...profile,
                fictionPreference: event.target.value,
              })
            }
          />
          Waargebeurd
        </label>

        <label>
          <input
            type="radio"
            name="fictionPreference"
            value="fictie"
            checked={profile.fictionPreference === "fictie"}
            onChange={(event) =>
              onChange({
                ...profile,
                fictionPreference: event.target.value,
              })
            }
          />
          Fictie
        </label>

        <label>
          <input
            type="radio"
            name="fictionPreference"
            value="maakt-niet-uit"
            checked={profile.fictionPreference === "maakt-niet-uit"}
            onChange={(event) =>
              onChange({
                ...profile,
                fictionPreference: event.target.value,
              })
            }
          />
          Maakt niet uit
        </label>
      </div>
      <div className="form-group">
        <h2>Wat voor soort hoofdpersoon spreekt je aan?</h2>

        <label>
          <input
            type="radio"
            name="mainCharacter"
            value="leeftijdgenoot"
            checked={profile.mainCharacter === "leeftijdgenoot"}
            onChange={(event) =>
              onChange({
                ...profile,
                mainCharacter: event.target.value,
              })
            }
          />
          Leeftijdgenoot
        </label>

        <label>
          <input
            type="radio"
            name="mainCharacter"
            value="bekend-persoon"
            checked={profile.mainCharacter === "bekend-persoon"}
            onChange={(event) =>
              onChange({
                ...profile,
                mainCharacter: event.target.value,
              })
            }
          />
          Bekend persoon
        </label>

        <label>
          <input
            type="radio"
            name="mainCharacter"
            value="held"
            checked={profile.mainCharacter === "held"}
            onChange={(event) =>
              onChange({
                ...profile,
                mainCharacter: event.target.value,
              })
            }
          />
          Held
        </label>

        <label>
          <input
            type="radio"
            name="mainCharacter"
            value="buitenstaander"
            checked={profile.mainCharacter === "buitenstaander"}
            onChange={(event) =>
              onChange({
                ...profile,
                mainCharacter: event.target.value,
              })
            }
          />
          Buitenstaander
        </label>
      </div>
      <button type="submit" className="form-submit">
        Profiel opslaan
      </button>
      {isEditing && (
        <button type="button" className="form-cancel" onClick={onCancel}>
          Annuleren
        </button>
      )}
    </form>
  );
}

export default ProfileForm;
