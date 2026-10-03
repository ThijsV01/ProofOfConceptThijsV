export type TokenPayload = {
    userId: string;
    role: "student" | "teacher";
};

export function decodeToken(token: string): TokenPayload {
    const payload = token.split(".")[1];

    return JSON.parse(
        atob(payload)
    );
}