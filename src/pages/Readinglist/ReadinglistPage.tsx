import { useEffect, useState } from "react";
import ReadingList from "../../components/readinglist/ReadingList";
import ReadingListSkeleton from "../../components/readinglist/ReadingListSkeleton";
import type { ReadingListItemWithBook } from "../../types/ReadingListItemWithBook";
import {
  ChangeStatusReadAPI,
  GetReadingListAPI,
  RemoveFromReadingListAPI,
} from "../../api/readingListApi";
import "./ReadingListPage.css";
function ReadingListPage() {
  const [readingList, setReadingList] = useState<ReadingListItemWithBook[]>([]);
  const [loading, setLoading] = useState(true);
  async function loadReadingList() {
    const response = await GetReadingListAPI();
    setReadingList(response.list);
  }
  useEffect(() => {
    async function loadData() {
      try {
        await loadReadingList();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
      {" "}
      <div className="leeslijst-header">
        {" "}
        <div>
          {" "}
          <h1>Mijn leeslijst</h1>{" "}
          <p>
            {" "}
            Hier vind je alle boeken die je wilt lezen of al hebt gelezen.{" "}
          </p>{" "}
        </div>{" "}
        {!loading && (
          <div className="leeslijst-count">
            {" "}
            {readingList.length}{" "}
            {readingList.length === 1 ? "boek" : "boeken"}{" "}
          </div>
        )}{" "}
      </div>{" "}
      {loading ? (
        <ReadingListSkeleton />
      ) : (
        <ReadingList
          items={readingList}
          onToggleRead={handleToggleRead}
          onRemove={handleRemove}
        />
      )}{" "}
    </div>
  );
}
export default ReadingListPage;
