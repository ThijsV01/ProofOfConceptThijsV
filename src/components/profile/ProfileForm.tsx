import type { ReadingProfile } from "../../types/Profile";
import { useState } from "react";
import "./ProfileForm.css";

type ProfileFormProps = {
  profile: ReadingProfile;
  onChange: (profile: ReadingProfile) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
};

// hetzelfde als in MongoDB
const genres = [
  "Romantiek",
  "Thriller",
  "Fantasy",
  "Horror",
  "Sciencefiction",
  "Avontuur",
  "Historisch",
  "Oorlog",
  "Sport",
  "Humor",
];

// hetzelfde als in MongoDB
const subjects = [
  "liefde",
  "vriendschap",
  "familie",
  "school",
  "oorlog",
  "misdaad",
  "avontuur",
  "fantasie",
  "sport",
  "geschiedenis",
];

const readingGoals = [
  "Nieuwe werelden ontdekken",
  "Aan het denken worden gezet",
  "Iets leren of te weten komen",
  "Een betere of snellere lezer worden",
  "Mijn kansen op schoolsucces vergroten",
  "Ik wil niet lezen",
];

function ProfileForm({
  profile,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}: ProfileFormProps) {
  const toggleArrayValue = (field: "genre" | "subject", value: string) => {
    const currentValues = profile[field] as string[];

    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    onChange({
      ...profile,
      [field]: newValues,
    });
  };

  const updateValue = (
    field: "languageLevel" | "length" | "readingGoal",
    value: string,
  ) => {
    onChange({
      ...profile,
      [field]: value,
    });
  };
  const [validationError, setValidationError] = useState("");
  const handleSubmit = () => {
    if (!profile.languageLevel) {
      setValidationError("Kies een leesniveau.");
      return;
    }

    if (profile.genre.length === 0) {
      setValidationError("Kies minimaal één genre.");
      return;
    }

    if (profile.subject.length === 0) {
      setValidationError("Kies minimaal één onderwerp.");
      return;
    }

    if (!profile.length) {
      setValidationError("Kies een leeslengte.");
      return;
    }

    if (!profile.readingGoal) {
      setValidationError("Kies een leesdoel.");
      return;
    }

    setValidationError("");
    onSubmit();
  };

  return (
    <form
      className="profile-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <p className="required-info">
        Velden met een <span className="required">*</span> zijn verplicht.
      </p>

      <details open>
        <summary>
          Leesniveau<span className="required">*</span>
        </summary>

        <div className="form-content">
          <label htmlFor="languageLevel">Hoe moeilijk mag het zijn?</label>

          <select
            id="languageLevel"
            value={profile.languageLevel}
            onChange={(event) =>
              updateValue("languageLevel", event.target.value)
            }
          >
            <option value="">Kies een niveau</option>
            <option value="A1">Makkelijk (A1)</option>
            <option value="A2">Makkelijk (A2)</option>
            <option value="B1">Gemiddeld (B1)</option>
            <option value="B2">Gemiddeld (B2)</option>
            <option value="C1">Uitdagend (C1)</option>
          </select>
        </div>
      </details>

      <details>
        <summary>
          Genre <span className="required">*</span>
        </summary>

        <div className="form-content">
          <OptionGroup
            title="Welk genre spreekt je aan?"
            options={genres}
            selected={profile.genre}
            onToggle={(value) => toggleArrayValue("genre", value)}
          />
        </div>
      </details>

      <details>
        <summary>
          Onderwerpen <span className="required">*</span>
        </summary>

        <div className="form-content">
          <OptionGroup
            title="Over welke onderwerpen zou je willen lezen?"
            options={subjects}
            selected={profile.subject}
            onToggle={(value) => toggleArrayValue("subject", value)}
          />
        </div>
      </details>

      <details>
        <summary>
          Leeslengte<span className="required">*</span>
        </summary>

        <div className="form-content">
          <label htmlFor="length">Hoe lang mag het zijn?</label>

          <select
            id="length"
            value={profile.length}
            onChange={(event) => updateValue("length", event.target.value)}
          >
            <option value="">Kies een lengte</option>
            <option value="Kort">Korte verhalen of teksten</option>
            <option value="Gemiddeld">Middel</option>
            <option value="Lang">Lang</option>
          </select>
        </div>
      </details>

      <details>
        <summary>
          Leesdoel<span className="required">*</span>
        </summary>

        <div className="form-content">
          <label htmlFor="readingGoal">Waarom lees je?</label>

          <select
            id="readingGoal"
            value={profile.readingGoal}
            onChange={(event) => updateValue("readingGoal", event.target.value)}
          >
            <option value="">Kies een leesdoel</option>

            {readingGoals.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </div>
      </details>
      {validationError && (
        <p className="profile-form-error" role="alert">
          {validationError}
        </p>
      )}
      <div className="profile-form-actions">
        {isEditing && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Annuleren
          </button>
        )}

        <button type="submit" className="save-button">
          {isEditing ? "Wijzigingen opslaan" : "Leesprofiel opslaan"}
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

function OptionGroup({ title, options, selected, onToggle }: OptionGroupProps) {
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
              className={selectedOption ? "option selected" : "option"}
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
