import { Link } from "react-router-dom";
import "./NotFoundPage.css"

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <span className="not-found-code">404</span>

                <h1>Pagina niet gevonden</h1>

                <p>
                    De pagina die je probeert te bekijken bestaat niet
                    of je hebt geen toegang tot deze pagina.
                </p>

                <Link to="/">
                    Terug
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;