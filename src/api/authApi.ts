import { apiFetch } from "./client";

type LoginRequest = {
    email: string;
    password: string;
};
type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    teacherId: string;
    role: "student" | "teacher";
};

type LoginResponse = {
    token: string;
};

type RegisterResponse = {
    message: string;
};

export function loginAPI(
    data: LoginRequest
) {
    return apiFetch<LoginResponse>(
        "/login",
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );
}
export function registerAPI(
    data: RegisterRequest
) {
    return apiFetch<RegisterResponse>(
        "/register",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}