import { AxiosResponse } from 'axios';
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { getUserInfo } from '../api/auth';
import { getAllBooks, updateBookShelf } from '../api/books';
import { BookShelfEnum } from '../enums/book-status.enum';
import { Book, BookShelfValues } from '../models/book.models';
import { User } from '../models/user.model';
import { TOKEN } from './AuthContext';

export type BooksContextType = {
  user: User;
  books: Book[];
  setUser: (user: User) => void;
  updateStatus: (
    { book, shelf }: { book: Book; shelf: BookShelfValues },
    {
      onSuccess,
      onError,
      onFinally,
    }: {
      onSuccess?: (res: AxiosResponse<{ books: Book[] }>) => void;
      onError?: (err: any) => void;
      onFinally?: () => void;
    }
  ) => void;
  removeBook: (book: Book) => void;
};

export const BooksContext = createContext<BooksContextType>({} as BooksContextType);

export const BooksContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      Promise.all([getUserInfo(), getAllBooks()])
        .then(([userInfoRes, booksInfoRes]) => {
          setUser(userInfoRes.data.user);
          setBooks(booksInfoRes.data.books);
        })
        .catch(err => {
          setUser({} as User);
          setBooks([]);
        });
      return;
    }
    setUser({} as User);
    setBooks([]);
  }, []);

  const removeBook: BooksContextType['removeBook'] = useCallback(
    book => {
      const filteredBooks = books.filter(_ => _.id !== book.id);
      setBooks(filteredBooks);
    },
    [books]
  );

  const updateStatus: BooksContextType['updateStatus'] = useCallback(
    ({ book, shelf }, { onError, onFinally, onSuccess }) => {
      updateBookShelf({ bookId: book.id, shelf })
        .then(res => {
          if (shelf === BookShelfEnum.None) {
            // Remove book
            const allBooks = books.filter(bk => bk.id !== book.id);
            setBooks(allBooks);
          } else {
            const bookIdx = books.findIndex(_ => _.id === book.id);
            if (bookIdx >= 0) {
              // Change book status
              const allBooks = [...books];
              allBooks[bookIdx].shelf = shelf;
              setBooks(allBooks);
            } else {
              // Add book
              setBooks(prev => [...prev, { ...book, shelf }]);
            }
          }
          onSuccess?.(res);
        })
        .catch(err => onError?.(err))
        .finally(() => onFinally?.());
    },
    [books]
  );

  const contextValues: BooksContextType = useMemo(
    () => ({
      books,
      removeBook,
      user,
      setUser,
      updateStatus,
    }),
    [books, removeBook, user, updateStatus]
  );

  return <BooksContext.Provider value={contextValues}>{children}</BooksContext.Provider>;
};
