import type { Book } from "../types/Book";
import type { ReadingListItem } from "../types/ReadingListItem";

const STORAGE_KEY = "readingList";

export function getReadingList(): ReadingListItem[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        return [];
    }

    return JSON.parse(stored);
}

export function saveReadingList(items: ReadingListItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToReadingList(book: Book): void {
    const readingList = getReadingList();

    const alreadyExists = readingList.some(
        item => item.book.id === book.id
    );

    if (alreadyExists) {
        return;
    }

    const newItem: ReadingListItem = {
        book,
        isRead: false
    };

    saveReadingList([...readingList, newItem]);
}

export function removeFromReadingList(bookId: number): void {
    const readingList = getReadingList();

    const updatedList = readingList.filter(
        item => item.book.id !== bookId
    );

    saveReadingList(updatedList);
}

export function toggleReadStatus(bookId: number): void {
    const readingList = getReadingList();

    const updatedList = readingList.map(item =>
        item.book.id === bookId
            ? {
                ...item,
                isRead: !item.isRead
            }
            : item
    );

    saveReadingList(updatedList);
}