export type UserRole = "student" | "docent";

export type User = {
    id:number,
    name: string;
    email:string;
    role: UserRole;
};