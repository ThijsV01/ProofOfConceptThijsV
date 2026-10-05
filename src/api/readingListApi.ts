import { apiFetch } from "./client";
import type { ReadingListItemWithBook } from "../types/ReadingListItemWithBook";

type GetReadingListResponse = {
  list: ReadingListItemWithBook[];
};

export function GetReadingListAPI() {
  return apiFetch<GetReadingListResponse>("/readinglist", {
    method: "GET",
  });
}
export function AddToReadingListAPI(bookId: string) {
  return apiFetch<ReadingListItemWithBook>(`/readinglist/${bookId}`, {
    method: "POST",
    body: JSON.stringify(bookId),
  });
}
export function RemoveFromReadingListAPI(itemId: string) {
  return apiFetch<void>(`/readinglist/${itemId}`, {
    method: "DELETE",
    body: JSON.stringify(itemId),
  });
}
export function ChangeStatusReadAPI(itemId: string) {
  return apiFetch<ReadingListItemWithBook>(`/readinglist/${itemId}`, {
    method: "PUT",
    body: JSON.stringify(itemId),
  });
}
