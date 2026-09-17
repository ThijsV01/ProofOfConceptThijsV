import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types/User";

type RoleRouteProps = {
    allowedRole: UserRole;
};

function RoleRoute({ allowedRole }: RoleRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== allowedRole) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
}

export default RoleRoute;