import type { Book } from "./Book";
import type { ReadingListItem } from "./ReadingListItem";

export type ReadingListItemWithBook = ReadingListItem & {
    book: Book | null;
};