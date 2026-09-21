export type UserRole = "student" | "docent";

export type User = {
    name: string;
    email:string;
    role: UserRole;
};