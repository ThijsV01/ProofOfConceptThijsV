import { apiFetch } from "./client";
import type { Teacher } from "../types/Teacher";
import type { Student } from "../types/Student";
import type { ReadingListItemWithBook } from "../types/ReadingListItemWithBook";

type GetTeachersResponse = {
  teachers: Teacher[];
};

type GetStudentsFromTeacherResponse = {
  students: Student[];
};

type GetReadingListResponse = {
  list: ReadingListItemWithBook[];
};

export function getTeachersAPI() {
  return apiFetch<GetTeachersResponse>("/teachers", {
    method: "GET",
  });
}

export function getStudentsFromTeacherAPI() {
  return apiFetch<GetStudentsFromTeacherResponse>("/teacher/students", {
    method: "GET",
  });
}

export function getReadingListFromStudentAPI(studentId: string) {
  return apiFetch<GetReadingListResponse>(
    `/teacher/students/${studentId}/readinglist`,
    {
      method: "GET"
    },
  );
}

export function addBookToStudentReadingListAPI(
  studentId: string,
  bookId: string,
) {
  return apiFetch<ReadingListItemWithBook>(
    `/teacher/students/${studentId}/readinglist/${bookId}`,
    {
      method: "POST",
      body: JSON.stringify({
        studentId,
        bookId,
      }),
    },
  );
}

export function deleteBookFromStudentReadingListAPI(
  studentId: string,
  itemId: string,
) {
  return apiFetch<void>(
    `/teacher/students/${studentId}/readinglist/${itemId}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        studentId,
        itemId,
      }),
    },
  );
}
