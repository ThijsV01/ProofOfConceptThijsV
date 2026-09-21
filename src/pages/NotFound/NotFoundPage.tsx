import { Link } from "react-router-dom";
import "./NotFoundPage.css"

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <span className="not-found-code">404</span>

                <h1>Page not found</h1>

                <p>
                    The page u tried to find doesn't exist, 
                    or you don't have access to this page.
                </p>

                <Link to="/">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;