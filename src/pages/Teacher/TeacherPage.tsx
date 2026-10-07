import { useEffect, useMemo, useState } from "react";
import {
getStudentsFromTeacherAPI,
getReadingListFromStudentAPI,
addBookToStudentReadingListAPI,
deleteBookFromStudentReadingListAPI,
} from "../../api/teacherApi";
import { getBooksAPI } from "../../api/booksApi";

import type { Book } from "../../types/Book";
import type { ReadingListItem } from "../../types/ReadingListItem";
import type { ReadingListItemWithBook } from "../../types/ReadingListItemWithBook";

import BookList from "../../components/books/BookList";
import CatalogusFilters from "../../components/catalog/CatalogFilters";
import Pagination from "../../components/catalog/Pagination";

import {
StudentListSkeleton,
ReadingListSkeleton,
CatalogusSkeleton,
} from "../../components/teacher/TeacherSkeleton";

import "./TeacherPage.css";

type Student = {
id: string;
name: string;
email: string;
};

function TeacherPage() {
const [students, setStudents] = useState<Student[]>([]);
const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

const [readingList, setReadingList] = useState<ReadingListItemWithBook[]>([]);

const [books, setBooks] = useState<Book[]>([]);

const [loadingStudents, setLoadingStudents] = useState(true);
const [loadingReadingList, setLoadingReadingList] = useState(false);
const [loadingBooks, setLoadingBooks] = useState(false);

// Filters
const [languageLevel, setLanguageLevel] = useState("");
const [genre, setGenre] = useState("");
const [subject, setSubject] = useState("");
const [length, setLength] = useState("");

// Pagination
const [currentPage, setCurrentPage] = useState(1);

const booksPerPage = 6;

useEffect(() => {
async function loadStudents() {
try {
const data = await getStudentsFromTeacherAPI();
setStudents(data.students);
} catch (error) {
console.error("Studenten ophalen mislukt:", error);
} finally {
setLoadingStudents(false);
}
}

loadStudents();

}, []);

useEffect(() => {
async function loadBooks() {
try {
setLoadingBooks(true);

    const data = await getBooksAPI();
    setBooks(data.books);
  } catch (error) {
    console.error("Catalogus ophalen mislukt:", error);
  } finally {
    setLoadingBooks(false);
  }
}

loadBooks();

}, []);

async function selectStudent(student: Student) {
setSelectedStudent(student);

try {
  setLoadingReadingList(true);

  const data = await getReadingListFromStudentAPI(student.id);

  setReadingList(data.list);
} catch (error) {
  console.error("Leeslijst ophalen mislukt:", error);
  setReadingList([]);
} finally {
  setLoadingReadingList(false);
}

}

async function addBook(book: Book) {
if (!selectedStudent) {
return;
}

try {
  await addBookToStudentReadingListAPI(selectedStudent.id, book.id);

  const data = await getReadingListFromStudentAPI(selectedStudent.id);
  setReadingList(data.list);
} catch (error) {
  console.error("Boek toevoegen mislukt:", error);
}

}

async function deleteBook(itemId: string) {
if (!selectedStudent) {
return;
}

try {
  await deleteBookFromStudentReadingListAPI(selectedStudent.id, itemId);

  setReadingList((currentList) =>
    currentList.filter((item) => item.id !== itemId),
  );
} catch (error) {
  console.error("Boek verwijderen mislukt:", error);
}

}

// Filter de catalogus
const filteredBooks = useMemo(() => {
return books.filter((book) => {
const matchesLanguageLevel =
!languageLevel || book.languageLevel === languageLevel;

  const matchesGenre = !genre || book.genre === genre;

  const matchesSubject = !subject || book.subject === subject;

  const matchesLength = !length || book.length === length;

  return (
    matchesLanguageLevel && matchesGenre && matchesSubject && matchesLength
  );
});

}, [books, languageLevel, genre, subject, length]);

// Pagination berekenen
const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

const startIndex = (currentPage - 1) * booksPerPage;

const paginatedBooks = filteredBooks.slice(
startIndex,
startIndex + booksPerPage,
);

function resetFilters() {
setLanguageLevel("");
setGenre("");
setSubject("");
setLength("");
setCurrentPage(1);
}

function handleLanguageLevelChange(value: string) {
setLanguageLevel(value);
setCurrentPage(1);
}

function handleGenreChange(value: string) {
setGenre(value);
setCurrentPage(1);
}

function handleSubjectChange(value: string) {
setSubject(value);
setCurrentPage(1);
}

function handleLengthChange(value: string) {
setLength(value);
setCurrentPage(1);
}

function handlePageChange(page: number) {
setCurrentPage(page);
}

const readingListForBookList: ReadingListItem[] = readingList.map((item) => ({
id: item.id,
bookId: item.bookId,
studentId: item.studentId,
isRead: item.isRead,
}));

return ( <div className="teacher-page"> <div className="teacher-header"> <h1>Docent</h1> <p>Bekijk en beheer de leeslijsten van jouw gekoppelde studenten.</p> </div>

  {/* Studenten */}
  <section className="teacher-section">
    <h2>Mijn studenten</h2>

    {loadingStudents ? (
      <StudentListSkeleton />
    ) : students.length === 0 ? (
      <p>Je hebt momenteel geen gekoppelde studenten.</p>
    ) : (
      <div className="student-list">
        {students.map((student) => (
          <button
            key={student.id}
            type="button"
            className="student-card"
            onClick={() => selectStudent(student)}
          >
            <div>
              <h3>{student.name}</h3>
              <p>{student.email}</p>
            </div>

            <span>
              {selectedStudent?.id === student.id
                ? "Geselecteerd"
                : "Leeslijst →"}
            </span>
          </button>
        ))}
      </div>
    )}
  </section>

  {selectedStudent && (
    <>
      {/* Leeslijst van student */}
      <section className="teacher-section">
        <div className="reading-list-header">
          <div>
            <h2>Leeslijst</h2>
            <p>Leeslijst van {selectedStudent.name}</p>
          </div>
        </div>

        {loadingReadingList ? (
          <ReadingListSkeleton />
        ) : readingList.length === 0 ? (
          <p>Deze student heeft momenteel geen boeken in de leeslijst.</p>
        ) : (
          <div className="reading-list">
            {readingList.map((item) => (
              <div key={item.id} className="reading-list-item">
                <div>
                  {item.book ? (
                    <>
                      <h3>{item.book.title}</h3>

                      {item.book.description && (
                        <p>{item.book.description}</p>
                      )}
                    </>
                  ) : (
                    <p>
                      Dit boek is niet meer beschikbaar in de catalogus.
                    </p>
                  )}
                </div>

                <button type="button" onClick={() => deleteBook(item.id)}>
                  Verwijderen
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Catalogus */}
      <section className="teacher-section">
        <div className="catalog-header">
          <div>
            <h2>Boek toevoegen</h2>
            <p>
              Kies een boek uit de catalogus om toe te voegen aan de
              leeslijst van {selectedStudent.name}.
            </p>
          </div>
        </div>

        <CatalogusFilters
          languageLevel={languageLevel}
          genre={genre}
          subject={subject}
          length={length}
          onLanguageLevelChange={handleLanguageLevelChange}
          onGenreChange={handleGenreChange}
          onSubjectChange={handleSubjectChange}
          onLengthChange={handleLengthChange}
          onReset={resetFilters}
        />

        <div className="catalogus-results">
          <p>{filteredBooks.length} boeken gevonden</p>
        </div>

        {loadingBooks ? (
          <CatalogusSkeleton />
        ) : filteredBooks.length === 0 ? (
          <div className="empty-message">
            <h2>Geen boeken gevonden</h2>

            <p>Probeer andere filters te gebruiken.</p>

            <button type="button" onClick={resetFilters}>
              Filters wissen
            </button>
          </div>
        ) : (
          <>
            <BookList
              books={paginatedBooks}
              readingList={readingListForBookList}
              onAddToReadingList={addBook}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </>
  )}
</div>

);
}

export default TeacherPage;
