export type UserRole = "student" | "docent";

export type User = {
    name: string;
    role: UserRole;
};