import React from 'react';
import { BookShelfEnum } from '../enums/book-status.enum';
import { Book, UpdateStatusType, BookShelfValues } from '../models/book.models';
import { BookItem } from './BookItem';
export const BooksShelf = ({
  books,
  shelf,
  updateStatus,
}: {
  books: Book[];
  shelf: BookShelfValues;
  updateStatus: UpdateStatusType;
}) => {
  return (
    <section>
      {shelf === BookShelfEnum.Read && (
        <h3 className="books-shelf__title text-green-300 ">Read ✔</h3>
      )}
      {shelf === BookShelfEnum.Reading && (
        <h3 className="books-shelf__title text-yellow-600">Reading ⏳</h3>
      )}
      {shelf === BookShelfEnum['Want To Read'] && (
        <h3 className="books-shelf__title text-sky-500">To Be Read 🔖</h3>
      )}
      <hr className="mx-0 mb-5 w-[100%]  sm:mx-2 sm:w-[300px]" />
      <div className="books-shelf">
        <ul className="mx-5 flex items-end sm:mx-10">
          {books.map(book => (
            <li
              key={book.id}
              className="mr-10 mb-10 inline-block min-w-[130px] max-w-[200px] sm:min-w-[160px] md:min-w-[200px]"
            >
              <BookItem book={book} onChangeStatus={updateStatus} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
