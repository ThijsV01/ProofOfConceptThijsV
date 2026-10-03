import {createContext,useContext,useEffect,useState} from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";
import {loginAPI,registerAPI} from "../api/authApi";
import { decodeToken } from "../utils/decodeToken";

type AuthContextType = {
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

const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
    children
}: AuthProviderProps) {

    // --------------------------------------------------
    // USER
    // --------------------------------------------------

    const [user, setUser] = useState<User | null>(() => {

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    });


    // --------------------------------------------------
    // TOKEN
    // --------------------------------------------------

    const [token, setToken] =
        useState<string | null>(() => {
            return localStorage.getItem("token");
        });


    // --------------------------------------------------
    // LOADING & ERROR
    // --------------------------------------------------

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);


    // --------------------------------------------------
    // USER OPSLAAN
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
    // TOKEN OPSLAAN
    // --------------------------------------------------

    useEffect(() => {

        if (token) {

            localStorage.setItem(
                "token",
                token
            );

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

            const response =
                await loginAPI({
                    email,
                    password
                });

            const decodedToken =
                decodeToken(response.token);

            setToken(response.token);

            setUser({
                id: decodedToken.userId,
                role: decodedToken.role
            });

        } catch (error) {

            if (error instanceof Error) {

                setError(error.message);

            } else {

                setError(
                    "Er is iets misgegaan tijdens het inloggen."
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
        password: string,
        teacherId: string,
    ) => {

        setIsLoading(true);
        setError(null);

        try {

            await registerAPI({
                name,
                email,
                password,
                teacherId,
                role:"student"
            });

        } catch (error) {

            if (error instanceof Error) {

                setError(error.message);

            } else {

                setError(
                    "Er is iets misgegaan tijdens het registreren."
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
    // ERROR
    // --------------------------------------------------
    const clearError = () => {
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
                clearError
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

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth moet binnen een AuthProvider worden gebruikt."
        );

    }

    return context;
}