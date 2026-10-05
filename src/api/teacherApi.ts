import { apiFetch } from "./client";
import type { Teacher } from "../types/Teacher";
import type { Student} from "../types/Student";

type GetTeachersResponse = {
    teachers: Teacher[];
};

type GetStudentsFromTeacherResponse = {
    students: Student[];
};

export function getTeachersAPI() {
    return apiFetch<GetTeachersResponse>(
        "/teachers",
        {
            method: "GET"
        }
    );
}

export function getStudentsFromTeacherAPI() {
    return apiFetch<GetStudentsFromTeacherResponse>(
        "/teacher/students",
        {
            method: "GET"
        }
    );
}