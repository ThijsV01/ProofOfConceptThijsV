import { useEffect, useState } from "react";

import ReadingList from "../../components/readinglist/ReadingList";

import type { ReadingListItem } from "../../types/ReadingListItem";

import {
    getReadingList,
    removeFromReadingList,
    toggleReadStatus
} from "../../services/readingListStorage";

import "./ReadingListPage.css";

function ReadingListPage() {
    const [readingList, setReadingList] = useState<ReadingListItem[]>([]);

    useEffect(() => {
        setReadingList(getReadingList());
    }, []);

    function handleToggleRead(bookId: number) {
        toggleReadStatus(bookId);
        setReadingList(getReadingList());
    }

    function handleRemove(bookId: number) {
        removeFromReadingList(bookId);
        setReadingList(getReadingList());
    }

    return (
        <div className="leeslijst-page">
            <div className="leeslijst-header">
                <div>
                    <h1>Mijn leeslijst</h1>

                    <p>
                        Hier vind je alle boeken die je wilt lezen of al hebt gelezen.
                    </p>
                </div>

                <div className="leeslijst-count">
                    {readingList.length}{" "}
                    {readingList.length === 1 ? "boek" : "boeken"}
                </div>
            </div>

            <ReadingList
                items={readingList}
                onToggleRead={handleToggleRead}
                onRemove={handleRemove}
            />
        </div>
    );
}

export default ReadingListPage;