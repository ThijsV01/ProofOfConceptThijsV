interface CatalogusFiltersProps {
    languageLevel: string;
    genre: string;
    subject: string;
    length: string;

    onLanguageLevelChange: (value: string) => void;
    onGenreChange: (value: string) => void;
    onSubjectChange: (value: string) => void;
    onLengthChange: (value: string) => void;

    onReset: () => void;
}

function CatalogusFilters({
    languageLevel,
    genre,
    subject,
    length,
    onLanguageLevelChange,
    onGenreChange,
    onSubjectChange,
    onLengthChange,
    onReset,
}: CatalogusFiltersProps) {
    return (
        <div className="catalogus-filters">
            <div className="filter-group">
                <label htmlFor="languageLevel">
                    Taalniveau
                </label>

                <select
                    id="languageLevel"
                    value={languageLevel}
                    onChange={(e) =>
                        onLanguageLevelChange(e.target.value)
                    }
                >
                    <option value="">Alle niveaus</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="genre">
                    Genre
                </label>

                <select
                    id="genre"
                    value={genre}
                    onChange={(e) =>
                        onGenreChange(e.target.value)
                    }
                >
                    <option value="">Alle genres</option>
                    <option value="Roman">Roman</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Non-fictie">Non-fictie</option>
                    <option value="Biografie">Biografie</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="subject">
                    Onderwerp
                </label>

                <select
                    id="subject"
                    value={subject}
                    onChange={(e) =>
                        onSubjectChange(e.target.value)
                    }
                >
                    <option value="">Alle onderwerpen</option>
                    <option value="Sport">Sport</option>
                    <option value="Liefde">Liefde</option>
                    <option value="Geschiedenis">Geschiedenis</option>
                    <option value="Avontuur">Avontuur</option>
                    <option value="Maatschappij">Maatschappij</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="length">
                    Lengte
                </label>

                <select
                    id="length"
                    value={length}
                    onChange={(e) =>
                        onLengthChange(e.target.value)
                    }
                >
                    <option value="">Alle lengtes</option>
                    <option value="Kort">Kort</option>
                    <option value="Gemiddeld">Gemiddeld</option>
                    <option value="Lang">Lang</option>
                </select>
            </div>

            <button
                type="button"
                onClick={onReset}
                className="reset-filters-button"
            >
                Filters wissen
            </button>
        </div>
    );
}

export default CatalogusFilters;