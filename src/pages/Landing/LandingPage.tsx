import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1>Welkom bij Libri</h1>

                <p>
                    Ontdek boeken die passen bij jouw leesvoorkeuren 
                    en ontvang persoonlijke leesadviezen.
                </p>
                <div className="landing-buttons">
                <Link className="landing-login-button" to="/login">
                    Log in
                </Link>

                <Link className="landing-login-button" to="/register">
                    Registreer
                </Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;