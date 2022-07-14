import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { searchBooks } from '../api/books';
import { BookItem } from '../components/BookItem';
import { BooksContext } from '../contexts/BooksContext';
import { BookShelfEnum } from '../enums/book-status.enum';
import { UpdateStatusType, Book } from '../models/book.models';

let timer: NodeJS.Timeout;
export const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [isNoSearchFound, setIsNoSearchFound] = useState(false);
  const { books: userBooks, updateStatus: updateBookStatus } = useContext(BooksContext);

  const updateStatus: UpdateStatusType = useCallback(
    ({ book, shelf }) => {
      const toastId = toast.loading('Changing book status to ' + shelf);
      updateBookStatus(
        { book, shelf },
        {
          onSuccess(res) {
            toast.update(toastId, {
              render: 'Updated successfully',
              type: 'success',
              isLoading: false,
              autoClose: 2000,
            });
          },
          onError(err) {
            toast.update(toastId, {
              render: 'Failed to change book status!',
              type: 'error',
              isLoading: false,
              autoClose: 2000,
            });
          },
        }
      );
    },
    [updateBookStatus]
  );
  useEffect(() => {
    setIsNoSearchFound(false);
    setIsNoSearchFound(false);
    if (searchText.trim().length) {
      setSearchLoading(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchBooks({ query: searchText, maxResults: 20 })
          .then(res => {
            const books = res.data.books;

            if (books.error) return setBooks([]);

            if (!books.length) {
              setBooks([]);
              setIsNoSearchFound(true);
              return;
            }

            const userBooksIds = userBooks.map(({ id }) => id);

            const searchedBooks: Book[] = books.map(book => {
              const idx = userBooksIds.indexOf(book.id);
              if (idx >= 0) {
                return userBooks[idx];
              }
              return {
                ...book,
                shelf: BookShelfEnum.None,
              };
            });

            setBooks(searchedBooks);
          })
          .catch(() => {
            setBooks([]);
            toast.error('Failed to search books');
            setIsNoSearchFound(true);
          })
          .finally(() => {
            setSearchLoading(false);
          });
      }, 1000);
    }
  }, [searchText, userBooks]);

  return (
    <section>
      <div className="my-5 mx-auto flex max-w-[90%] items-center justify-center px-5 sm:max-w-[60%]">
        <input
          type="text"
          placeholder="Search by title or author, or ISBN"
          onChange={e => setSearchText(e.target.value)}
          value={searchText}
          className="input-field flex-1"
        />
      </div>
      <div className="relative mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
        {searchLoading && (
          <div className="overlay-loading">
            <p className="mt-[5rem] rounded-[6px] bg-yellow-700 px-5 text-center text-[1.5rem] text-white">
              Loading ..
            </p>
          </div>
        )}
        {isNoSearchFound && (
          <div className="flex min-h-[50vh] items-center justify-center text-white">
            <p className="text-center text-[2rem]">
              Ummm .. couldn't find items for search text:
              <span className="inline-block rounded-md bg-slate-400 px-2 py-1 text-black">
                {searchText}
              </span>
              🤔
            </p>
          </div>
        )}
        <ul className="flex flex-wrap items-end justify-center">
          {books.map(book => (
            <li
              key={book.id}
              className="mb-10 mr-10 inline-block min-w-[130px] max-w-[200px] sm:min-w-[160px] md:min-w-[200px]"
            >
              <BookItem book={book} onChangeStatus={updateStatus} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
