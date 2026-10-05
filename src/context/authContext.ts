import { createContext } from "react";
import type { User } from "../types/User";

export type AuthContextType = {
    user: User | null;
    token: string | null;

    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    register: (
        name: string,
        email: string,
        password: string,
        teacherId: string
    ) => Promise<void>;

    logout: () => void;
    clearError: () => void;
};

export const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );