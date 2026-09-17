import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PublicRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Outlet />;
    }

    if (user.role === "student") {
        return <Navigate to="/profiel" replace />;
    }

    return <Navigate to="/docent" replace />;
}

export default PublicRoute;