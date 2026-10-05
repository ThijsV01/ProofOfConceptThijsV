import { useEffect, useState } from "react";
import ReadingList from "../../components/readinglist/ReadingList";
import type { ReadingListItemWithBook } from "../../types/ReadingListItemWithBook";
import { ChangeStatusReadAPI, GetReadingListAPI, RemoveFromReadingListAPI} from "../../api/readingListApi";

import "./ReadingListPage.css";

function ReadingListPage() {
    const [readingList, setReadingList] = useState<ReadingListItemWithBook[]>([]);

    async function loadReadingList() {
        const response = await GetReadingListAPI();
        setReadingList(response.list);
    }

    useEffect(() => {
    async function loadData() {
        try {
            const response = await GetReadingListAPI();
            setReadingList(response.list);
        } catch (error) {
            console.error(error);
        }
    }

    loadData();
}, []);


    async function handleToggleRead(itemId: string) {
        await ChangeStatusReadAPI(itemId);
        await loadReadingList();
    }

    async function handleRemove(itemId: string) {
        await RemoveFromReadingListAPI(itemId);
        await loadReadingList();
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