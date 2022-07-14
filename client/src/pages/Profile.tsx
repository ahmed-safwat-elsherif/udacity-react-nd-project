import React, { useCallback, useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BooksShelf } from '../components/BooksShelf';
import { AuthContext } from '../contexts/AuthContext';
import { BooksContext } from '../contexts/BooksContext';
import { BookShelfEnum } from '../enums/book-status.enum';
import { UpdateStatusType } from '../models/book.models';

export const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const { books: userBooks, updateStatus: updateBookStatus } = useContext(BooksContext);

  const readBook = useMemo(
    () => userBooks.filter(_ => _.shelf === BookShelfEnum.Read),
    [userBooks]
  );
  const readingBook = useMemo(
    () => userBooks.filter(_ => _.shelf === BookShelfEnum.Reading),
    [userBooks]
  );
  const tobeReadBook = useMemo(
    () => userBooks.filter(_ => _.shelf === BookShelfEnum['Want To Read']),
    [userBooks]
  );

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

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <>
      <h1 className="px-5 text-[2rem]">Books</h1>
      <BooksShelf books={readBook} shelf={BookShelfEnum.Read} updateStatus={updateStatus} />
      <BooksShelf books={readingBook} shelf={BookShelfEnum.Reading} updateStatus={updateStatus} />
      <BooksShelf
        books={tobeReadBook}
        shelf={BookShelfEnum['Want To Read']}
        updateStatus={updateStatus}
      />
    </>
  );
};
