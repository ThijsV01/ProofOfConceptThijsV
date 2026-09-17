import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User, UserRole } from "../types/User";

type AuthContextType = {
    user: User | null;
    login: (name: string, role: UserRole) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        return JSON.parse(savedUser);
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (name: string, role: UserRole) => {
        setUser({
            name,
            role
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth moet binnen een AuthProvider worden gebruikt.");
    }

    return context;
}