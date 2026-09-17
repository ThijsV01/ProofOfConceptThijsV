import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1>Welkom bij Libri</h1>

                <p>
                    Ontdek boeken die passen bij jouw leesvoorkeuren
                    en ontvang persoonlijk leesadvies.
                </p>

                <Link className="landing-login-button" to="/login">
                    Inloggen
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;