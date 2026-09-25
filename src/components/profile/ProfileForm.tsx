import type { ReadingProfile } from "../../types/Profile";
import "./ProfileForm.css";

type ProfileFormProps = {
  profile: ReadingProfile;
  onChange: (profile: ReadingProfile) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
};

const fictionGenres = [
  "Fantasy",
  "Avontuur",
  "Thriller",
  "Romantiek",
  "Sciencefiction",
];

const nonFictionGenres = [
  "Geschiedenis",
  "Sport",
  "Wetenschap",
  "Biografie",
];

const subjects = [
  "Avontuur",
  "Vriendschap",
  "Liefde",
  "Oorlog",
  "Sport",
  "Familie",
];

const readingExperiences = [
  "Spanning",
  "Humor",
  "Ontroering",
  "Avontuur",
  "Ontspanning",
];

function ProfileForm({
  profile,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}: ProfileFormProps) {

  const toggleArrayValue = (
    field:
      | "fictionGenre"
      | "nonFictionGenre"
      | "subjects"
      | "readingExperience",
    value: string
  ) => {
    const currentValues = profile[field];

    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    onChange({
      ...profile,
      [field]: newValues,
    });
  };

  const updateValue = (
    field:
      | "difficulty"
      | "length"
      | "fictionPreference"
      | "mainCharacter",
    value: string
  ) => {
    onChange({
      ...profile,
      [field]: value,
    });
  };

  return (
    <form
      className="profile-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >

      <details open>
        <summary>Genres</summary>

        <div className="form-content">
          <OptionGroup
            title="Fictie"
            options={fictionGenres}
            selected={profile.fictionGenre}
            onToggle={(value) =>
              toggleArrayValue("fictionGenre", value)
            }
          />

          <OptionGroup
            title="Waargebeurd"
            options={nonFictionGenres}
            selected={profile.nonFictionGenre}
            onToggle={(value) =>
              toggleArrayValue("nonFictionGenre", value)
            }
          />
        </div>
      </details>


      <details>
        <summary>Onderwerpen</summary>

        <div className="form-content">
          <OptionGroup
            title="Onderwerpen"
            options={subjects}
            selected={profile.subjects}
            onToggle={(value) =>
              toggleArrayValue("subjects", value)
            }
          />
        </div>
      </details>


      <details>
        <summary>Leesniveau</summary>

        <div className="form-content">
          <label htmlFor="difficulty">
            Moeilijkheid
          </label>

          <select
            id="difficulty"
            value={profile.difficulty}
            onChange={(event) =>
              updateValue("difficulty", event.target.value)
            }
          >
            <option value="">Kies een niveau</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
        </div>
      </details>


      <details>
        <summary>Leeslengte</summary>

        <div className="form-content">
          <label htmlFor="length">
            Lengte
          </label>

          <select
            id="length"
            value={profile.length}
            onChange={(event) =>
              updateValue("length", event.target.value)
            }
          >
            <option value="">Kies een lengte</option>
            <option value="Kort">Kort</option>
            <option value="Gemiddeld">Gemiddeld</option>
            <option value="Lang">Lang</option>
          </select>
        </div>
      </details>


      <details>
        <summary>Leeservaring</summary>

        <div className="form-content">
          <OptionGroup
            title="Wat wil je ervaren?"
            options={readingExperiences}
            selected={profile.readingExperience}
            onToggle={(value) =>
              toggleArrayValue("readingExperience", value)
            }
          />
        </div>
      </details>


      <details>
        <summary>Fictie of waargebeurd</summary>

        <div className="form-content">
          <label htmlFor="fictionPreference">
            Voorkeur
          </label>

          <select
            id="fictionPreference"
            value={profile.fictionPreference}
            onChange={(event) =>
              updateValue(
                "fictionPreference",
                event.target.value
              )
            }
          >
            <option value="">Kies een voorkeur</option>
            <option value="Voornamelijk fictie">
              Voornamelijk fictie
            </option>
            <option value="Voornamelijk waargebeurd">
              Voornamelijk waargebeurd
            </option>
            <option value="Beide">
              Beide
            </option>
          </select>
        </div>
      </details>


      <details>
        <summary>Hoofdpersoon</summary>

        <div className="form-content">
          <label htmlFor="mainCharacter">
            Hoofdpersoon
          </label>

          <select
            id="mainCharacter"
            value={profile.mainCharacter}
            onChange={(event) =>
              updateValue(
                "mainCharacter",
                event.target.value
              )
            }
          >
            <option value="">Kies een voorkeur</option>
            <option value="Jongen">Jongen</option>
            <option value="Meisje">Meisje</option>
            <option value="Volwassene">Volwassene</option>
            <option value="Maakt niet uit">
              Maakt niet uit
            </option>
          </select>
        </div>
      </details>


      <div className="profile-form-actions">
        {isEditing && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Annuleren
          </button>
        )}

        <button
          type="submit"
          className="save-button"
        >
          {isEditing
            ? "Wijzigingen opslaan"
            : "Leesprofiel opslaan"}
        </button>
      </div>

    </form>
  );
}


type OptionGroupProps = {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
};

function OptionGroup({
  title,
  options,
  selected,
  onToggle,
}: OptionGroupProps) {
  return (
    <div className="option-group">
      <h3>{title}</h3>

      <div className="option-list">
        {options.map((option) => {
          const selectedOption = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              className={
                selectedOption
                  ? "option selected"
                  : "option"
              }
              onClick={() => onToggle(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileForm;