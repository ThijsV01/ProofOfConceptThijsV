import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

type Role = "student" | "teacher";

type RoleRouteProps = {
    allowedRole: Role;
};

function RoleRoute({ allowedRole }: RoleRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

     if (user.role !== allowedRole) {
        if (user.role === "student") {
            return (
                <Navigate
                    to="/profile"
                    replace
                />
            );
        }

        if (user.role === "teacher") {
            return (
                <Navigate
                    to="/teacher"
                    replace
                />
            );
        }
    }
    return <Outlet />;
}

export default RoleRoute;