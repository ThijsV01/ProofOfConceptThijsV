import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1>Welcome to Libri</h1>

                <p>
                    Discover books that fit your reading preferences and 
                    receive personalized reading recommendations
                </p>

                <Link className="landing-login-button" to="/login">
                    Log in
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;