import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PublicRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Outlet />;
    }

    if (user.role === "student") {
        return <Navigate to="/profile" replace />;
    }

    return <Navigate to="/teacher" replace />;
}

export default PublicRoute;