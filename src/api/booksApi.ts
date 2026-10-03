import { apiFetch } from "./client";

export type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    subject: string;
    genre: string;
    languageLevel: string;
    length: string;
};

type GetBooksResponse = {
    books: Book[];
};

export function getBooks() {
    return apiFetch<GetBooksResponse>(
        "/books"
    );
}
export function getBook(bookId: string) {
    return apiFetch<Book>(
        `/books/${bookId}`
    );
}
export function getRecommended() {
    return apiFetch<GetBooksResponse>(
        "/book/recommended"
    );
}