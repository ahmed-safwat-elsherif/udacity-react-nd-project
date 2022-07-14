import { useEffect, useMemo, useState } from 'react';
import { getBookById } from '../api/books';
import { Book } from '../models/book.models';

export type UseBookDetailsReturn = {
  book?: Book;
  error?: string | Error;
  loading: boolean;
};
export type UseBookDetailsOptions = {
  revalidate: number /** number of milliseconds */;
};

export const useBookDetails = ({ bookId }: { bookId: string }): UseBookDetailsReturn => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    getBookById({ bookId })
      .then(res => setBook(res.data.book))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [bookId]);

  const data: UseBookDetailsReturn = useMemo(
    () => ({
      book,
      error,
      loading,
    }),
    [book, error, loading]
  );
  return data;
};
