import { apiFetch } from "./client";
import type { Book } from "../types/Book";

type GetBooksResponse = {
    books: Book[];
};

export function getBooksAPI() {
    return apiFetch<GetBooksResponse>(
        "/books",
        {
            method: "GET"
        }
    );
}
export function getBookAPI(bookId: string) {
    return apiFetch<Book>(
        `/books/${bookId}`,
        {
            method: "GET",
            body: JSON.stringify(bookId)
        }
    );
}
export function getRecommendedAPI() {
    return apiFetch<GetBooksResponse>(
        "/books/recommended",
        {
            method: "GET"
        }
    );
}