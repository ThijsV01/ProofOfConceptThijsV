import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";

type AuthContextType = {
    user: User | null;
    token: string | null;

    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    login: (email: string, password: string) => Promise<void>;

    register: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;

    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {

    // --------------------------------------------------
    // USER
    // --------------------------------------------------

    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        return JSON.parse(savedUser);
    });


    // --------------------------------------------------
    // TOKEN
    // --------------------------------------------------

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });


    // --------------------------------------------------
    // LOADING & ERROR
    // --------------------------------------------------

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);


    // --------------------------------------------------
    // USER OPSLAAN IN LOCALSTORAGE
    // --------------------------------------------------

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);


    // --------------------------------------------------
    // TOKEN OPSLAAN IN LOCALSTORAGE
    // --------------------------------------------------

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);


    // --------------------------------------------------
    // LOGIN
    // --------------------------------------------------

    const login = async (
        email: string,
        password: string
    ) => {

        setIsLoading(true);
        setError(null);

        try {

            // TIJDELIJKE TESTLOGIN
            // Deze vervangen we later door de backend.

            if (
                email === "thijs@example.com" &&
                password === "123456"
            ) {

                const mockUser: User = {
                    id: 1,
                    name: "Thijs Vernooij",
                    email: "thijs@example.com",
                    role: "student",
                };

                setUser(mockUser);

                setToken("temporary-token");

                return;
            }


            if (
                email === "docent@example.com" &&
                password === "123456"
            ) {

                const mockUser: User = {
                    id: 2,
                    name: "Mvr. Janssen",
                    email: "docent@example.com",
                    role: "docent",
                };

                setUser(mockUser);

                setToken("temporary-token");

                return;
            }


            throw new Error(
                "Ongeldig e-mailadres of wachtwoord."
            );

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Er is iets misgegaan."
                );
            }

            throw error;

        } finally {

            setIsLoading(false);

        }
    };


    // --------------------------------------------------
    // REGISTER
    // --------------------------------------------------

    const register = async (
        name: string,
        email: string,
        password: string
    ) => {

        setIsLoading(true);
        setError(null);

        try {

            // TIJDELIJK
            // Later wordt dit een API-call.

            console.log(
                "Nieuwe gebruiker:",
                {
                    name,
                    email,
                    password,
                }
            );

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Er is iets misgegaan."
                );
            }

            throw error;

        } finally {

            setIsLoading(false);

        }
    };


    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------

    const logout = () => {

        setUser(null);

        setToken(null);

        setError(null);

    };


    // --------------------------------------------------
    // AUTHENTICATED
    // --------------------------------------------------

    const isAuthenticated =
        user !== null &&
        token !== null;


    // --------------------------------------------------
    // PROVIDER
    // --------------------------------------------------

    return (
        <AuthContext.Provider
            value={{
                user,
                token,

                isLoading,
                error,
                isAuthenticated,

                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


// --------------------------------------------------
// USE AUTH
// --------------------------------------------------

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth moet binnen een AuthProvider worden gebruikt."
        );
    }

    return context;
}